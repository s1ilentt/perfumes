
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.contrib import admin
from main.views import CartViewSet, CartItemViewSet, PerfumeList, PerfumeDetail, CategoryList
from django.conf import settings

router = DefaultRouter()
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'cart-items', CartItemViewSet, basename='cart-items')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/perfumes/', PerfumeList.as_view(), name='perfume-list'),
    path('api/v1/categories/', CategoryList.as_view(), name='category-list'),
    path('api/v1/', include(router.urls)),
    path("api/v1/perfumes/<int:pk>/", PerfumeDetail.as_view(), name="perfume-detail"),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
