from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CartItem
from .serializers import CartItemSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import get_object_or_404

from products.models import Product

class CartItemView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        items = CartItem.objects.filter(user=request.user)
        serializer = CartItemSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            product = get_object_or_404(Product, id=serializer.validated_data['product'].id)
            cart_item, created = CartItem.objects.get_or_create(user=request.user, product=product, defaults={
                'qty': serializer.validated_data['qty'],
                'selected': serializer.validated_data['selected']
            })

            if not created:
                cart_item.qty += serializer.validated_data['qty']
                cart_item.save()
            return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CartItemDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        cart_item = get_object_or_404(CartItem, id=pk, user=request.user)
        serializer = CartItemSerializer(cart_item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(CartItemSerializer(cart_item).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        cart_item = get_object_or_404(CartItem, id=pk, user=request.user)
        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)