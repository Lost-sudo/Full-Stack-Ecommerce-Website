from rest_framework import serializers
from .models import Order, OrderItem, PaymentMethod, DeliveryCarrier

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'name', 'qty', 'price', 'image']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

class CreateOrderSerializer(serializers.Serializer):
    shipping_address_id = serializers.IntegerField()
    payment_method = serializers.ChoiceField(choices=PaymentMethod.choices)
    delivery_carrier = serializers.ChoiceField(choices=DeliveryCarrier.choices)
    items = serializers.ListField()

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError("No items in provided.")
        return value


