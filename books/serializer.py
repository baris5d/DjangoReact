from django.conf import settings 

from rest_framework import serializers

from .models import Books


class BooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        fields = ['name','author','description']

    def validate_description(self, value):
        if len(value) > 300:
            raise serializers.ValidationError("This is too long")
        return value