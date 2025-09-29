from rest_framework import serializers

from .models import Perfume


class PerfumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perfume
        fields = ('name', 'category')