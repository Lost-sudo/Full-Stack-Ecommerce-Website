from django.urls import path
from .views import CartItemView, CartItemDetailView

urlpatterns = [
    path('cart/', CartItemView.as_view(), name='cart-list'),
    path('cart/<int:pk>/', CartItemDetailView.as_view(), name='cart-detail')
]