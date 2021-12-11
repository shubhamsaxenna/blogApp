from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.http import HttpResponse, Http404, response
from rest_framework import status

from .serializers import UserSerializer
from .models import Users
# Create your views here.

class UsersView(APIView):
    def get(self, request, *args, **kwargs):
        user_list = Users.objects.all()
        data = []

        for item in user_list:
            result ={
                "id" : item.id,
                "firstname": item.firstname,
                "lastname": item.lastname,
                "email": item.email
            }
            data.append(result)
        return Response(data)


    def post(self, request, *args, ** kwargs):
        isUserValid = Users.objects.get(email = request.data['email'], password= request.data['password'])        
        print(isUserValid.id)
        if isUserValid:
            result ={
                    "id" : isUserValid.id,
                    "firstname" : isUserValid.firstname,
                    "lastname" : isUserValid.lastname,
                    "email" : isUserValid.email
                }
            return Response(result)            
        else:
            return Response("User not exist", status=status.HTTP_401_UNAUTHORIZED)

@csrf_exempt
@api_view(['POST'])
def RegisterUser(request):
        user_Serializer = UserSerializer(data = request.data)
        
        if Users.objects.filter(email=request.data['email']).exists():
            return Response("Email already exits")
        else:
            if user_Serializer.is_valid():
                user_Serializer.save()
                return Response(user_Serializer.data)
            else:
                return Response(user_Serializer.errors)