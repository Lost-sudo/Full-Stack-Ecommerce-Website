from django.urls import path
from .views import RegisterView, CustomLoginView,UserProfileView, SellerProfileView, ProfileStatusView, ShippingAddressView, ShippingAddressDetailView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', CustomLoginView.as_view(), name='login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token-refresh'),

    path('user-profile/', UserProfileView.as_view(), name='user-profile'),
    path('seller-profile/', SellerProfileView.as_view(), name='seller-profile'),
    path('profile-status/', ProfileStatusView.as_view(), name='profile-status'),

    path('addresses/', ShippingAddressView.as_view(), name='shipping-address'),
    path('addresses/<int:pk>/', ShippingAddressDetailView.as_view(), name='shipping-address-detail'),
]