from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.response import Response
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.models import ShippingAddress
from products.models import Product, Category
from cart.models import CartItem
from .models import Order, OrderItem

User = get_user_model()

class OrderAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='testuser@example.com', password='testpass123')
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

        self.category = Category.objects.create(name='Electronics', slug='electronics')
        self.product = Product.objects.create(
            seller=self.user,
            description='Test Product',
            price=100.00,
            category=self.category,
            stock=10
        )

        self.address = ShippingAddress.objects.create(
            user=self.user,
            recipient_name='Test User',
            phone_number='1234567890',
            address_line='123 Street',
            city='Test City',
            postal_code='123456',
            country='Test Country'
        )

        self.cart_item = CartItem.objects.create(
            user=self.user,
            product=self.product,
            qty=2,
            selected=True
        )

        self.order_url = reverse('orders')

    def test_create_order(self):
        payload = {
            'shipping_address_id': self.address.id,
            'payment_method': 'Gcash',
            'delivery_carrier': 'LBC',
            'items': [self.cart_item.id]
        }
        response = self.client.post(self.order_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Order.objects.filter(user=self.user).exists())
        self.assertTrue(OrderItem.objects.filter(order__user=self.user).exists())

    def test_get_orders(self):
        self.test_create_order()
        response = self.client.get(self.order_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_order_with_empty_cart(self):
        CartItem.objects.all().delete()
        payload = {
            'shipping_address_id': self.address.id,
            'payment_method': 'Gcash',
            'delivery_carrier': 'LBC',
            'items': []
        }
        response = self.client.post(self.order_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("items", response.data)
