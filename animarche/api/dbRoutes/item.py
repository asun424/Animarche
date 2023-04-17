from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..utils import get_client
from bson.objectid import ObjectId
import jwt

class Item(APIView):
    def get(self, request, *args, **kwargs):
        token = request.headers["Authorization"]
        idObj = jwt.decode(token, "noenvvariableyet", algorithms="HS256")
        idString = idObj["id"]
        user_collection = get_client("user")
        user = user_collection.find_one({"_id": ObjectId(idString)}, {"_id": 0, "favoritedItems": 1})
        print(user)
        return Response(user)

    def put(self, request, *args, **kwargs):
        user_collection = get_client("user")
        user = user_collection.find_one({"_id": ObjectId(request.data["_id"]), "favoritedItems": {"$in": [request.data["singleResult"]]}})
        if user != None:
            return Response(True)
        else:
            return Response(False)

    def post(self, request, *args, **kwargs):
        user_collection = get_client("user")
        user_collection.update_one({"_id": ObjectId(request.data["_id"])}, {"$push": {"favoritedItems": request.data["singleResult"]}})
        return Response(True)

    def delete(self, request, *args, **kwargs):
        user_collection = get_client("user")
        user_collection.update_one({"_id": ObjectId(request.data["_id"])}, {"$pull": {"favoritedItems": request.data["singleResult"]}})
        if request.data["location"] == None:
            return Response(False)
        else: 
            user = user_collection.find_one({"_id": ObjectId(request.data["_id"])}, {"_id": 0, "favoritedItems": 1})
            return Response(user)
    
    #delete for deleting items
