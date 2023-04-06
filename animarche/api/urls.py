from django.urls import path, include
from .scraperRoutes import scrapeUrls
from .dbRoutes import dbUrls
from .recommendationRoutes import recommendationUrls

urlpatterns = [
    path("scrape/", include(scrapeUrls)),
    path("db/", include(dbUrls)),
    path("recommendation/", include(recommendationUrls))
]