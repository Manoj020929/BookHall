from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import Book


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ("id", "username", "email", "password")

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = (
            "id", "title", "author", "isbn", "category", "description",
            "published_year", "total_copies", "available_copies",
            "created_at", "updated_at",
        )
        read_only_fields = ("created_at", "updated_at")

    def validate(self, attrs):
        total = attrs.get("total_copies", getattr(self.instance, "total_copies", 1))
        available = attrs.get(
            "available_copies", getattr(self.instance, "available_copies", total)
        )
        if available > total:
            raise serializers.ValidationError(
                {"available_copies": "Available copies cannot exceed total copies."}
            )
        return attrs