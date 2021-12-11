from .serializer import BlogsSerializer
from .models import AllBlogs
from users.models import Users
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

@api_view(['GET'])
def allBlogsView(request):
    if request.method == 'GET':
        data = []

        for item in AllBlogs.objects.all():
            result = {
                "id" : item.id,
                "subject" : item.subject,
                "content" : item.content,
                "created_time" : item.created_time,
                "likes" : item.likes,
                "created_by" : {
                    "id" : item.created_by.id,
                    "firstname":item.created_by.firstname,
                    "lastname":item.created_by.lastname,
                    "email":item.created_by.email
                }
            }
            data.append(result)
        return Response(data)

@api_view(['GET','POST','PUT','DELETE'])
def userBlogs(request, user_id):
    if request.method == 'GET':
        data = []

        all_blogs = AllBlogs.objects.filter(created_by = user_id).order_by('created_time')
        
        for item in all_blogs:
            result = {
                "id" : item.id,
                "subject" : item.subject,
                "content" : item.content,
                "created_time" : item.created_time,
                "likes" : item.likes,
                "created_by" : {
                    "id" : item.created_by.id,
                    "firstname":item.created_by.firstname,
                    "lastname":item.created_by.lastname,
                    "email":item.created_by.email
                }
            }
            data.append(result)
        return Response(data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        request.data['created_by'] = user_id
        
        blog_Serializer = BlogsSerializer(data=request.data)
        
        if blog_Serializer.is_valid():
            blog_Serializer.save()
            data = []

            all_blogs = AllBlogs.objects.filter(created_by = user_id).order_by('created_time')
        
            for item in all_blogs:
                result = {
                    "id" : item.id,
                    "subject" : item.subject,
                    "content" : item.content,
                    "created_time" : item.created_time,
                    "likes" : item.likes,
                    "created_by" : {
                        "id" : item.created_by.id,
                        "firstname":item.created_by.firstname,
                        "lastname":item.created_by.lastname,
                        "email":item.created_by.email
                    }
                }
                data.append(result)
            return Response(data, status=status.HTTP_200_OK)

        else:
            return Response(blog_Serializer.errors)

    if request.method == 'PUT':
        blog = AllBlogs.objects.get(id=request.data['id'])
        
        return Response()
    
    if request.method == 'DELETE':
        blog = AllBlogs.objects.get(id=request.data['id'])
        blog.delete()
        data = []

        all_blogs = AllBlogs.objects.filter(created_by = user_id).order_by('created_time')
        
        for item in all_blogs:
            result = {
                "id" : item.id,
                "subject" : item.subject,
                "content" : item.content,
                "created_time" : item.created_time,
                "likes" : item.likes,
                "created_by" : {
                    "id" : item.created_by.id,
                    "firstname":item.created_by.firstname,
                    "lastname":item.created_by.lastname,
                    "email":item.created_by.email
                }
            }
            data.append(result)
        return Response(data, status=status.HTTP_200_OK)

@api_view(['PUT'])
def blogsLike(request):
    blog_id = request.data['id']
    user_like = request.data['like']
    
    blog_id = AllBlogs.objects.get(id = blog_id)
    if blog_id :
        blog_id.likes = blog_id.likes + 1
        blog_id.save()

        result = {
            "id" : blog_id.id,
            "subject" : blog_id.subject,
            "content" : blog_id.content,
            "created_time" : blog_id.created_time,
            "likes" : blog_id.likes,
            "created_by" : {
                "id" : blog_id.created_by.id,
                "firstname":blog_id.created_by.firstname,
                "lastname":blog_id.created_by.lastname,
                "email":blog_id.created_by.email
            }
        }
        return Response(result, status=status.HTTP_200_OK)
    else :
        return Response("Blog doesn't exist", status=status.HTTP_404_NOT_FOUND)
