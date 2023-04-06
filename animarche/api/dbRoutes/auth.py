from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from bson.objectid import ObjectId
from ..utils import get_client
import bcrypt
import jwt
from bson.json_util import dumps

# Create your views here.
class Auth(APIView):
    def checkUser(self, collection, credentials):
        #get all users
        #compare raw string password to their hased value
        #if none come up, then has password and put it in
        isUser = collection.find_one({"username": credentials["username"]})
        if credentials["method"] == "signup":
            if isUser == None:
                credentials["password"] = bcrypt.hashpw(credentials["password"].encode("utf-8"), bcrypt.gensalt(10)).decode()
                return credentials
            else:
                return isUser
        elif credentials["method"] == "login":
            return isUser
    


    def post(self, request, *args, **kwargs):
        #request should have username password email
        user_collection = get_client("user")
        if request.data["method"] == "signup":
            user = self.checkUser(user_collection, request.data)
            if user.get("_id") == None:
                del user["method"]
                newlyRegisteredUser = user_collection.insert_one(user)
                #inserted objects are not subscriptable, so you have to use . rather than [] for access
                print(newlyRegisteredUser.inserted_id)
                #objectids are a weird datatype, so you have to use dumps to jsonify them
                token = jwt.encode({"id": str(newlyRegisteredUser.inserted_id)}, "noenvvariableyet", algorithm="HS256")
                return Response({"token": token})
            else:
                return Response("username and password already taken")
        elif request.data["method"] == "login":
            user = self.checkUser(user_collection, request.data)
            if user == None:
                return Response("We do not have a record of your account")
            else:
                token = jwt.encode({"id": str(user["_id"])}, "noenvvariableyet", algorithm="HS256")
                return Response({"token": token})

    
    def get(self, request, *args, **kwargs):
        token = request.headers["Authorization"]
        idObj = jwt.decode(token, "noenvvariableyet", algorithms="HS256")
        idString = idObj["id"]
        user_collection = get_client("user")
        # SECOND CLAUSE GETS ONLY SPECIFIED FIELDS, 1 for show, 0 for no show (optional)
        user = user_collection.find_one({"_id": ObjectId(idString)}, {"_id": 1})
        #remember to stringify your objectId before sending response because the objectid IS NOT JSON SERIALIZABLE
        user["_id"] = str(user["_id"])
        return Response(user)

