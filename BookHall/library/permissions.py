from rest_framework import permissions


class IsStaffOrReadOnly(permissions.BasePermission):
    """Logged-in users can read. Only staff (admins) can add, edit or delete."""

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return bool(request.user and request.user.is_authenticated)
        return bool(request.user and request.user.is_staff)