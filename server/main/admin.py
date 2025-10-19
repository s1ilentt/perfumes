from django.contrib import admin
from .models import Perfume, Category,Cart, CartItem
# Register your models here.
admin.site.register(Perfume)
admin.site.register(Category)
admin.site.register(Cart)
admin.site.register(CartItem)