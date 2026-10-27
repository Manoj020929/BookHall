from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import BookViewSet, RegisterView, categories

router = DefaultRouter()
router.register("books", BookViewSet, basename="book")

urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("categories/", categories, name="categories"),
    path("", include(router.urls)),
]