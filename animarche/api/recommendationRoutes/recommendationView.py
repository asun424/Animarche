from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import tensorflow as tf
from tensorflow import keras
import numpy as np

# Create your views here.
class Recommend(APIView):
    def post(self, request, *args, **kwargs):
        score = request.data["score"]
        reference = ['Haikyuu', 'Tengen Toppa Gurren Lagann', 'Kimi Ni Todoke', 'Kaguya-sama', 'Shigatsu Wa Kimi No Uso', 'Barakamon', 'Durarara', 'Death Parade', 'Spirited Away', 'Samurai Champloo', 'Naruto', 'Lupin III', 'Inuyasha', 'Mob Psycho 100', 'Sangatsu No Lion', 'Jojo Part 4', 'Golden Kamuy', 'Horimiya', 'Full Metal Alchemist', 'Gin No Saji', 'Akatsuki No Yona', 'Cyberpunk Edgerunners', 'Noragami', 'Chainsaw Man', 'Bocchi The Rock', 'Spy X Family', 'Ya Boy Kongming', 'Blood Blockade Battlefront', 'Showa Genroku Rakugo Shinjuu', 'Oddtaxi', 'Cowboy Bebop', 'Devilman Crybaby', 'Beastars', 'Eureka Seven', 'Deadman Wonderland', 'Banana Fish', 'Run With The Wind', 'Honey And Clover', 'Mirumo', 'Digimon Tamers', 'Ousama Ranking', 'Kimi Wa Houkago Insomnia', 'Mairimashita Irumakun', 'Welcome To The Ballroom', 'Jujutsu Kaisen', 'Soul Eater', 'Working', 'Mushi-shi', 'Bokura Wa Kawaii Minna Sou', 'Amaaa To Inazuma']
        myModel = keras.models.load_model("../../ML_Basics/my_model")
        score = np.array([score])
        result = myModel.predict(score)
        index = np.argmax(result)
        print(result)
        print(reference[index])
        return Response(reference[index])
