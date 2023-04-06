from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import concurrent.futures
from ..scraper.scrapeTools import createUrls, getCollection


# Create your views here.
class Scrape(APIView):
    def get(self, request, *args, **kwargs):
        query = request.GET["keyword"]
        collection = []
        urls = createUrls(query, collection)
        with concurrent.futures.ThreadPoolExecutor() as executor: 
            executor.map(getCollection, urls)
        return Response(collection)
