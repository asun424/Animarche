from django.urls import path
from .auth import Auth
urlpatterns = [
    path("auth/", Auth.as_view()),
    path("me/", Auth.as_view())
]