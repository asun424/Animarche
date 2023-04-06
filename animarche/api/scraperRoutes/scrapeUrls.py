from django.urls import path
from .scrapeView import Scrape

urlpatterns = [
    path("", Scrape.as_view()),
]