from django.contrib.auth.models import AbstractUser
from django.db import models

from accounts.enums import UserRole


class User(AbstractUser):
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=32, choices=UserRole.choices, default=UserRole.USER)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.username
