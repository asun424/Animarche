from pymongo import MongoClient

def get_client(collectionName):
    client = MongoClient("mongodb://localhost:27017")
    db_handle = client["animarche"]
    if collectionName not in db_handle.list_collection_names():
        db_handle.create_collection(collectionName)
        collection = db_handle[collectionName]
    else: 
        collection = db_handle[collectionName]
    return collection
