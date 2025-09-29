from django.shortcuts import render
from rest_framework import generics

from .models import Perfume
from .serializers import PerfumeSerializer


class PerfumeList( generics.ListAPIView):
    queryset = Perfume.objects.all()
    serializer_class = PerfumeSerializer
