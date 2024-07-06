from django.urls import path
from accounts.api.public.views import RegisterView, LoginView

app_name = 'public'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
