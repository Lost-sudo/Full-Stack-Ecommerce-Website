from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.validators import validate_email
from rest_framework.validators import UniqueValidator
from .models import UserProfile, SellerProfile, ShippingAddress
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

# Serializer for user registration with email validation and password confirmation
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all()), validate_email]
    )
    password = serializers.CharField(min_length=8, write_only=True)
    confirm_password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ('email', 'full_name', 'password', 'confirm_password')

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            password=validated_data['password']
        )
        return user

# Custom TokenObtainPairSerializer to include email in the token
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        return token
    
    def validate(self, attrs):
        return super().validate(attrs)


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'
        read_only_fields = ['user']

    def create(self, validated_data):
        user = self.context['request'].user
        if validated_data.get('is_default'):
            ShippingAddress.objects.filter(user=user).update(is_default=False)
        return ShippingAddress.objects.create(user=user, **validated_data)

    def update(self, instance, validated_data):
        if validated_data.get('is_default'):
            ShippingAddress.objects.filter(user=instance.user).exlude(pk=instance.pk).update(is_default=False)
        return super().update(instance, validated_data)



# Serializer for returning basic user info with profile flags
class UserSerializer(serializers.ModelSerializer):
    has_profile = serializers.SerializerMethodField()
    has_seller_profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'email', 'full_name', 'is_seller', 'has_profile', 'has_seller_profile')

    def get_has_profile(self, obj):
        return obj.has_profile()
    
    def get_has_seller_profile(self, obj):
        return obj.has_seller_profile()


# Serializer for regular user profile
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['profile_picture']

    def create(self, validated_data):
        profile = UserProfile.objects.create(
            user = self.context['request'].user,
            profile_picture=validated_data.get('profile_picture'),
        )
        return profile

    def update(self, instance, validated_data):
        instance.profile_picture = validated_data.get('profile_picture', instance.profile_picture)
        instance.save()
        return instance
    
# Serializer for seller profile
class SellerProfileSerializer(serializers.ModelSerializer):
    shop_name = serializers.CharField()
    shop_description = serializers.CharField()
    shop_address = serializers.CharField()

    class Meta:
        model = SellerProfile
        fields = ('shop_name', 'shop_description', 'shop_address', 'shop_contact_number', 'shop_logo')

    def create(self, validated_data):
        profile = SellerProfile.objects.create(
            user = self.context['request'].user,
            shop_name = validated_data.get('shop_name'),
            shop_description = validated_data.get('shop_description'),
            shop_address = validated_data.get('shop_address'),
            shop_contact_number = validated_data.get('shop_contact_number', ''),
            shop_logo = validated_data.get('shop_logo', None)
        )
        return profile

    def update(self, instance, validated_data):
        instance.shop_name = validated_data.get('shop_name', instance.shop_name)
        instance.shop_description = validated_data.get('shop_description', instance.shop_description)
        instance.shop_address = validated_data.get('shop_address', instance.shop_address)
        instance.shop_phone_number = validated_data.get('shop_contact_number', instance.shop_contact_number)
        instance.shop_logo = validated_data.get('shop_logo', instance.shop_logo)
        instance.save()
        return instance
