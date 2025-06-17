from django.db import models
from django.contrib.auth import get_user_model
from products.models import Product

User = get_user_model()

class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='cart_items')
    qty = models.PositiveIntegerField(default=1)
    selected = models.BooleanField(default=False)
    added_at = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')