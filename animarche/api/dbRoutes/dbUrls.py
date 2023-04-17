from django.urls import path
from .auth import Auth
from .item import Item
urlpatterns = [
    path("auth/", Auth.as_view()),
    path("item/", Item.as_view()),
    path("me/", Auth.as_view())
]