from django.contrib import admin

from accounts.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'role']
    search_fields = ['username', 'email']
    list_filter = ['role']
    ordering = ['username']
