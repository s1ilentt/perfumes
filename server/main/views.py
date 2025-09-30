from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from django.forms.models import model_to_dict
from .models import Perfume
from .serializers import PerfumeSerializer
from rest_framework.views import APIView
from rest_framework import generics

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status  # Для использования HTTP-кодов


class PerfumeList(APIView):
    def get(self, request, *args, **kwargs):
        p = Perfume.objects.all()
        return Response({'perfumes': PerfumeSerializer(p, many=True).data})

    def post(self, request, *args, **kwargs):
        serializer = PerfumeSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            validated_data = serializer.validated_data
            post_new = Perfume.objects.create(**validated_data)

            return Response({'perfume': PerfumeSerializer(post_new).data},
                            status=status.HTTP_201_CREATED)








