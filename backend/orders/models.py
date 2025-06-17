from django.db import models
from accounts.models import ShippingAddress
from products.models import Product
from cart.models import CartItem
from django.contrib.auth import get_user_model

User = get_user_model()

class PaymentMethod(models.TextChoices):
    COD = 'Cash on Delivery'
    GCASH = 'Gcash'
    CREDIT_CARD = 'Credit Cart'

class DeliveryCarrier(models.TextChoices):
    LBC = 'LBC'
    JNT = 'J&T'
    NINJAVAN = 'NinjaVan'

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    shipping_address = models.ForeignKey(ShippingAddress, on_delete=models.CASCADE, related_name="orders")
    payment_method = models.CharField(max_length=50, choices=PaymentMethod.choices)
    delivery_carrier = models.CharField(max_length=50, choices=DeliveryCarrier.choices)
    tax_price = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(blank=True, null=True)
    is_delivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order # {self.id} by {self.user.email} Order"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="order_items")
    name = models.CharField(max_length=255)
    qty = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField()

    def __str__(self):
        return f"{self.name} ({self.qty}) in Order #{self.order.id}"

    @property
    def product_main_image_url(self):
        main_image = self.product.images.filter(is_main=True).first()
        return main_image.image.url if main_image and main_image.image else ''

