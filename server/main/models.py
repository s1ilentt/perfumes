from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, db_index=True)

    def __str__(self):
        return self.name


class Perfume(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.FloatField()
    mark = models.FloatField()
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    photo = models.ImageField(null=True, blank=True, upload_to="images/")
    is_visible = models.BooleanField(default=True)


    def __str__(self):
        return self.name


class Cart(models.Model):
    session_token = models.CharField(
        max_length=255,
        unique=True,
        db_index=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart {self.id} (session {self.session_token})"


class CartItem(models.Model):
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name="items"
    )
    product = models.ForeignKey(
        Perfume,
        on_delete=models.CASCADE,
        related_name="cart_items"
    )
    quantity = models.PositiveIntegerField(default=1)
    price_at_add = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} × {self.product.name} (cart {self.cart.id})"
