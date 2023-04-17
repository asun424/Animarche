from rest_framework.views import APIView
from api.utils import get_client
import jwt 
from bson.json_util import ObjectId

class AuthChecker(APIView):
    def __init__(self, get_response):
        self.get_response = get_response
    def __call__(self, request):
        if "item" in request.META["PATH_INFO"] and request.META["REQUEST_METHOD"] != "GET":
            token = request.headers["Authorization"]
            idObj = jwt.decode(token, "noenvvariableyet", algorithms="HS256")
            idString = idObj["id"]
            user_collection = get_client("user")
            user = user_collection.find_one({"_id": ObjectId(request.body[8:32].decode("utf-8"))}, {"_id": 1})
            if user == None:
                raise Exception("User cannot be found")
            elif idString != str(user["_id"]):
                raise Exception("You do not have access to this account")
            else:
                response = self.get_response(request)
                return response
        else:
            response = self.get_response(request)
            return response

    # def process_exception(request, exception):
    #     print("HELLO")
            
        