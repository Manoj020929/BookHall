from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework import generics, permissions, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Book
from .serializers import BookSerializer, RegisterSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class BookViewSet(viewsets.ModelViewSet):
    """Full CRUD for books. Supports ?search= and ?category="""

    serializer_class = BookSerializer

    def get_queryset(self):
        qs = Book.objects.all()
        search = self.request.query_params.get("search")
        category = self.request.query_params.get("category")
        if search:
            qs = qs.filter(
                Q(title__icontains=search)
                | Q(author__icontains=search)
                | Q(isbn__icontains=search)
            )
        if category:
            qs = qs.filter(category__iexact=category)
        return qs

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


@api_view(["GET"])
def categories(request):
    names = (
        Book.objects.exclude(category="")
        .values_list("category", flat=True)
        .distinct()
        .order_by("category")
    )
    return Response(list(names))