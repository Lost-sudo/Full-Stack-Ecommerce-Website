from rest_framework import serializers
from .models import CartItem

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    product_price = serializers.ReadOnlyField(source='product.price')
    product_image = serializers.SerializerMethodField()

    def get_product_image(self, obj):
        main_image = obj.product.images.filter(is_main=True).first()
        return main_image.image.url if main_image and main_image.image else None


    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_name', 'product_price', 'product_image', 'qty', 'selected']
