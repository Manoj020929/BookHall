from django.contrib import admin

from .models import Book, BookPage


class BookPageInline(admin.StackedInline):
    model = BookPage
    extra = 1


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "isbn", "category", "available_copies", "total_copies")
    search_fields = ("title", "author", "isbn")
    list_filter = ("category",)
    inlines = [BookPageInline]