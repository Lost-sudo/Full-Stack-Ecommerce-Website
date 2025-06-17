from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import UserProfile, SellerProfile, ShippingAddress
from .serializers import RegisterSerializer, CustomTokenObtainPairSerializer, UserProfileSerializer, SellerProfileSerializer, ShippingAddressSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import NotFound
from rest_framework_simplejwt.views import TokenObtainPairView

# Helper to safely get a profile or raise a 404
def get_user_profile_or_404(model, user):
    try:
        return model.objects.get(user=user)
    except model.DoesNotExist:
        raise NotFound(f"{model.__name__} does not exist for the user.")

# Handles user registration
class RegisterView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': 'User registered successfully.'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Custom Login view to obtain JWT tokens
class CustomLoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# Create / Update / Get regular user profile
class UserProfileView(APIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        if request.user.has_profile():
            return Response({'error': 'Profile already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Profile created successfully.',
                'profile': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        profile = get_user_profile_or_404(UserProfile, request.user)

        serializer = self.serializer_class(profile, data=request.data, partial=True, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        profile = get_user_profile_or_404(UserProfile, request.user)

        serializer = self.serializer_class(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Create / Update / Get seller profile
class SellerProfileView(APIView):
    serializer_class = SellerProfileSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        if request.user.has_seller_profile():
            return Response({'error': 'Seller profile already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=request.data, context={'request': request})

        if serializer.is_valid():
            profile = serializer.save()
            return Response({
                'message' : 'Seller profile created successfully.',
                'profile' : SellerProfileSerializer(profile).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request):
        profile = get_user_profile_or_404(SellerProfile, request.user)
        serializer = self.serializer_class(profile, data=request.data, partial=True, context={'request': request})
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        profile = get_user_profile_or_404(SellerProfile, request.user)
        if not profile.is_verified:
            return Response({'error': 'Seller profile is not verified.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.serializer_class(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Returns whether the logged-in user has a profile or seller profile
class ProfileStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            'has_profile': request.user.has_profile(),
            'has_seller_profile': request.user.has_seller_profile()
        }, status=status.HTTP_200_OK)


class ShippingAddressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        address = ShippingAddress.objects.filter(user=request.user)
        serializer = ShippingAddressSerializer(address, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ShippingAddressSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ShippingAddressDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, request, pk):
        return get_object_or_404(ShippingAddress, pk=pk, user=request.user)

    def get(self, request, pk):
        address = self.get_object(request, pk)
        serializer = ShippingAddressSerializer(address)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        address = self.get_object(request, pk)
        serializer = ShippingAddressSerializer(address, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        address = self.get_object(request, pk)
        address.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
