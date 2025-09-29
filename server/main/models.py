from django.db import models

# Create your models here.

class Perfume(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.FloatField()
    mark = models.FloatField()
    category = models.ForeignKey('Category', on_delete=models.PROTECT)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100, db_index=True)

    def __str__(self):
        return self.name
