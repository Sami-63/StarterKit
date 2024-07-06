from django.urls import path, include

app_name = 'accounts'

urlpatterns = [
    path('public/', include('accounts.api.public.urls')),
]