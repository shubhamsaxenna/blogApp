from django.urls import path
# from .views import  AllBlogsApiView
from . import views

urlpatterns = [
    path('', views.UsersView.as_view())
]