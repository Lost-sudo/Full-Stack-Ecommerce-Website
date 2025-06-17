from tkinter.font import names

from django.urls import path
from .views import (
    CategoryListCreateAPIView, CategoryDetailAPIView,
    ProductListCreateAPIView, ProductDetailAPIView,
    TagListCreateView, TagDetailApiView,
    ProductImageListCreateView, ProductImageDetailAPIView
)

urlpatterns = [
    # Categories
    path('categories/', CategoryListCreateAPIView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryDetailAPIView.as_view(), name='category-detail'),

    # Products
    path('products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('products/<int:pk>', ProductDetailAPIView.as_view(), name='product-detail'),

    # Tags
    path('tags/', TagListCreateView.as_view(), name='tag-list-create'),
    path('tags/<int:pk>', TagDetailApiView.as_view(), name='tag-detail'),

    # Product images
    path('images/', ProductImageListCreateView.as_view(), name='product-image-list-create'),
    path('images/<int:pk>', ProductImageDetailAPIView.as_view(), name='product-image-detail'),
]