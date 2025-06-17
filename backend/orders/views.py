from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Order, OrderItem
from accounts.models import ShippingAddress
from cart.models import CartItem
from .serializers import OrderSerializer, CreateOrderSerializer
from django.shortcuts import get_object_or_404

class OrderView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).prefetch_related('items')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CreateOrderSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            shipping_address = get_object_or_404(ShippingAddress, id=serializer.validated_data['shipping_address_id'])

            selected_cart_items = CartItem.objects.filter(user=user, selected=True)
            if not selected_cart_items.exists():
                return Response({'error': 'No selected items in cart.'}, status=400)

            order = Order.objects.create(
                user=user,
                shipping_address=shipping_address,
                payment_method=serializer.validated_data['payment_method'],
                delivery_carrier=serializer.validated_data['delivery_carrier'],
                tax_price=0,
                shipping_price=0,
                total_price=0,
            )

            total = 0
            for item in selected_cart_items:
                product = item.product
                subtotal = item.qty * product.price
                total += subtotal
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    name=product.name,
                    qty=item.qty,
                    price=product.price,
                    image=product.images.first().image_url if product.images.exists() and product.images.first() else ''
                )
                item.delete()  # Remove item from cart

            order.total_price = total
            order.save()

            return Response(OrderSerializer(order).data, status=201)
        return Response(serializer.errors, status=400)