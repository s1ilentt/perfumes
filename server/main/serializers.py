from rest_framework import serializers

from .models import Perfume, Category


class PerfumeSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    description = serializers.CharField()
    price = serializers.FloatField()
    mark = serializers.FloatField()
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())



