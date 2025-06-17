from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth import get_user_model
from products.models import Product, Category
from .models import CartItem

User = get_user_model()

class CartAPITests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(email='test@example.com', password='testpass123')
        self.client.force_authenticate(user=self.user)

        self.category = Category.objects.create(name='Test Category', slug='test-category')

        self.product = Product.objects.create(
            seller=self.user,
            name='Test Product',
            description='A product for testing',
            price=100.00,
            stock=50,
            category=self.category
        )

        self.cart_url = reverse('cart-list')
        self.cart_item_data = {
            'product': self.product.id,
            'qty': 2,
            'selected': True
        }

    def test_add_item_to_cart(self):
        response = self.client.post(self.cart_url, self.cart_item_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CartItem.objects.count(), 1)
        item = CartItem.objects.first()
        self.assertEqual(item.product, self.product)
        self.assertEqual(item.qty, 2)

    def test_view_cart_items(self):
        CartItem.objects.create(user=self.user, product=self.product, qty=2, selected=True)
        response = self.client.get(self.cart_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_update_cart_item(self):
        item = CartItem.objects.create(user=self.user, product=self.product, qty=2)
        update_url = reverse('cart-detail', args=[item.id])
        response = self.client.put(update_url, {'qty': 3})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        item.refresh_from_db()
        self.assertEqual(item.qty, 3)

    def test_delete_cart_item(self):
        item = CartItem.objects.create(user=self.user, product=self.product, qty=2)
        delete_url = reverse('cart-detail', args=[item.id])
        response = self.client.delete(delete_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(CartItem.objects.count(), 0)

    def test_cart_item_user_isolation(self):
        other_user = User.objects.create_user(email="other@example.com", password="otherpassword")
        CartItem.objects.create(user=other_user, product=self.product, qty=2)

        response = self.client.get(self.cart_url)
        self.assertEqual(len(response.data), 0)

