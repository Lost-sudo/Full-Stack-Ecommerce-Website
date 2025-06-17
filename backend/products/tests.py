from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from django.contrib.auth import get_user_model
from products.models import Category, Tag, ProductImage, Product
from rest_framework import status
from io import BytesIO
from PIL import Image

from accounts.models import SellerProfile

User = get_user_model()

def create_image():
    file = BytesIO()
    image = Image.new('RGB', (100, 100))
    image.save(file, 'jpeg')
    file.name = 'test.jpg'
    file.seek(0)
    return file

class ProductAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email="seller@example.com", password="password123", is_seller=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        SellerProfile.objects.create(user=self.user, shop_name="Test Shop", shop_description="Test Shop Description", shop_address="Test Shop Address", shop_contact_number="1234567890")

        self.category = Category.objects.create(name="Electronics", slug="electronics")
        self.tag1 = Tag.objects.create(name="laptop")
        self.tag2 = Tag.objects.create(name="mobile")
        self.tag3 = Tag.objects.create(name="apple")

    def test_create_category(self):
        url = reverse('category-list-create')
        data = {"name": "Books", "slug": "books"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_tag(self):
        url = reverse('tag-list-create')
        data = {"name": "gaming"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_product(self):
        url = reverse('product-list-create')
        data = {
            "name": "MacBook Pro",
            "description": "M3 Laptop",
            "price": "2000.00",
            "discounted_price": "1800.00",
            "stock": 5,
            "category": "electronics",
            "tags": ["laptop", "apple"],
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_product(self):
        url = reverse('product-list-create')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_product_image(self):
        product = Product.objects.create(
            name="Test Product",
            description="Description",
            price="100.00",
            category=self.category,
            seller=self.user,
            stock=10
        )
        product.tags.set([self.tag1, self.tag2])

        url = reverse('product-image-list-create')
        image = create_image()
        data = {
            "product": product.id,
            "image": image,
            "is_main": True
        }
        response = self.client.post(url, data, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_product(self):
        product = Product.objects.create(
            name="Old name",
            description="Old description",
            price=100,
            category=self.category,
            seller=self.user,
            stock=5
        )

        product.tags.set([self.tag1])
        url = reverse('product-detail', args=[product.id])
        data = {
            "name": "Updated Product",
            "description": "Updated Description",
            "price": "150.00",
            "discounted_price": "140.00",
            "stock": 15,
            "category": "electronics",
            "tags": ["apple"]
        }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Updated Product")

    def test_delete_tag(self):
        url = reverse('tag-detail', args=[self.tag1.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


    def test_get_single_category(self):
        url = reverse('category-detail', args=[self.category.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_category(self):
        url = reverse('category-detail', args=[self.category.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_get_single_tag(self):
        url = reverse('tag-detail', args=[self.tag1.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_product(self):
        product = Product.objects.create(
            name="Test Product",
            description="Description",
            price="100.00",
            category=self.category,
            seller=self.user,
            stock=10
        )
        url = reverse('product-detail', args=[product.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_product(self):
        product = Product.objects.create(
            name="To be deleted",
            description="Description",
            price=200,
            category=self.category,
            seller=self.user,
            stock=1
        )
        url = reverse('product-detail', args=[product.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_get_and_delete_product_image(self):
        product = Product.objects.create(
            name="Product with image",
            description="Desc",
            price=300,
            category=self.category,
            seller=self.user,
            stock=5
        )
        product.tags.set([self.tag1])
        image = create_image()
        image_data = {
            "product": product.id,
            "image": image,
            "is_main": True
        }
        create_response = self.client.post(reverse('product-image-list-create'), image_data, format="multipart")
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)

        image_id = create_response.data['id']
        get_response = self.client.get(reverse('product-image-detail', args=[image_id]))
        self.assertEqual(get_response.status_code, status.HTTP_200_OK)

        delete_response = self.client.delete(reverse('product-image-detail', args=[image_id]))
        self.assertEqual(delete_response.status_code, status.HTTP_204_NO_CONTENT)


