from rest_framework import serializers
from .models import Perfume, Category, Cart, CartItem


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class PerfumeSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Perfume
        fields = ["id", "name", "description", "price", "mark", "category"]


class CartItemSerializer(serializers.ModelSerializer):
    product = PerfumeSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Perfume.objects.all(),
        source="product",
        write_only=True
    )

    class Meta:
        model = CartItem
        fields = ["id", "product", "product_id", "quantity", "price_at_add"]


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "session_token", "items", "total", "created_at", "updated_at"]
        read_only_fields = ["session_token", "created_at", "updated_at"]

    def get_total(self, obj):
        return sum(item.quantity * float(item.price_at_add) for item in obj.items.all())
