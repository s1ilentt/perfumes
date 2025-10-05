from django.forms.models import model_to_dict
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action

from .models import Perfume, Cart, CartItem
from .serializers import PerfumeSerializer, CartSerializer, CartItemSerializer


class PerfumeList(APIView):
    def get(self, request, *args, **kwargs):
        perfumes = Perfume.objects.all()
        return Response({'perfumes': PerfumeSerializer(perfumes, many=True).data})

    def post(self, request, *args, **kwargs):
        serializer = PerfumeSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            validated_data = serializer.validated_data
            new_perfume = Perfume.objects.create(**validated_data)
            return Response({'perfume': PerfumeSerializer(new_perfume).data},
                            status=status.HTTP_201_CREATED)


class CartViewSet(viewsets.ViewSet):
    @action(detail=False, methods=["post"])
    def create_cart(self, request):
        import uuid
        token = str(uuid.uuid4())
        cart = Cart.objects.create(session_token=token)
        response = Response({"cart_token": token, "detail": "Корзина создана"})
        response.set_cookie("cart_token", token)
        return response

    def get_cart(self, request):
        token = request.COOKIES.get("cart_token")
        if not token:
            return None
        cart, _ = Cart.objects.get_or_create(session_token=token)
        return cart

    def list(self, request):
        cart = self.get_cart(request)
        if not cart:
            return Response({"detail": "Корзина не найдена"}, status=status.HTTP_404_NOT_FOUND)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=["post"])
    def add_item(self, request):
        cart = self.get_cart(request)
        if not cart:
            return Response({"detail": "Корзина не найдена"}, status=status.HTTP_404_NOT_FOUND)

        serializer = CartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product = serializer.validated_data["product"]
        quantity = serializer.validated_data["quantity"]

        item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={"quantity": quantity, "price_at_add": product.price}
        )
        if not created:
            item.quantity += quantity
            item.save()

        return Response(CartSerializer(cart).data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["post"])
    def clear(self, request):
        cart = self.get_cart(request)
        if not cart:
            return Response({"detail": "Корзина не найдена"}, status=status.HTTP_404_NOT_FOUND)
        cart.items.all().delete()
        return Response({"detail": "Корзина очищена"})


class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    queryset = CartItem.objects.all()

    def get_queryset(self):
        token = self.request.COOKIES.get("cart_token")
        if not token:
            return CartItem.objects.none()
        cart = Cart.objects.filter(session_token=token).first()
        return CartItem.objects.filter(cart=cart) if cart else CartItem.objects.none()
