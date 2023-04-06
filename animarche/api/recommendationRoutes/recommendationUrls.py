from django.urls import path
from .recommendationView import Recommend

urlpatterns = [
    path("", Recommend.as_view()),
]