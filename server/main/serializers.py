from rest_framework import serializers
from .models import Perfume, Category, Cart, CartItem
from .utils import get_exchange_rate


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class PerfumeSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Perfume
        fields = ["id", "name", "description", "price", "mark", "category", "photo"]


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
    total_uah = serializers.SerializerMethodField()
    total_cny = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "items", "total", "total_uah", "total_cny"]

    def get_total(self, obj):
        return sum(item.quantity * float(item.price_at_add) for item in obj.items.all())

    def get_total_uah(self, obj):
        total_usd = self.get_total(obj)
        usd_to_uah = get_exchange_rate("USD") or 1
        return round(total_usd * usd_to_uah, 2)

    def get_total_cny(self, obj):
        total_usd = self.get_total(obj)
        usd_to_cny = get_exchange_rate("CNY") / get_exchange_rate("USD") if get_exchange_rate("USD") else 1
        return round(total_usd * usd_to_cny, 2)
