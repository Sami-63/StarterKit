from django.db.models import TextChoices


class UserRole(TextChoices):
    ADMIN = 'admin', 'Admin'
    USER = 'user', 'User'
