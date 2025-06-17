from rest_framework import serializers
from products.models import Category, Tag, ProductImage, Product

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

    def validate_name(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("Category name must be at least 3 characters long.")
        return value

class TagSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), many=True, required=False)
    class Meta:
        model = Tag
        fields = '__all__'

    def validate_name(self, value):
        if not value.isalnum():
            raise serializers.ValidationError("Tag name must be alphanumeric.")
        return value

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'
        read_only_fields = ['uploaded_at']

    def validate(self, data):
        if data.get('is_main'):
            product = data['product']
            if product.images.filter(is_main=True).exists():
                raise serializers.ValidationError("Only one image can be main.")
        return data

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field='slug', queryset=Category.objects.all())
    tags = serializers.SlugRelatedField(slug_field='name', queryset=Tag.objects.all(), many=True)
    images = ProductImageSerializer(many=True, read_only=True)
    seller = serializers.StringRelatedField()

    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['seller', 'created_at']

    def create(self, validated_data):
        tags = validated_data.pop('tags', [])
        validated_data['seller'] = self.context['request'].user
        product = Product.objects.create(**validated_data)
        product.tags.set(tags)
        return product

    def validate(self, data):
        if data.get('discounted_price'):
            if data['discounted_price'] >= data['price']:
                raise serializers.ValidationError("Discounted price must be less than price.")
        return data


