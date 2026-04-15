from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Order, QuoteRequest

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ('user', 'ordered_at', 'status')

class QuoteRequestSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    class Meta:
        model = QuoteRequest
        fields = '__all__'
        read_only_fields = ('user', 'created_at', 'status')