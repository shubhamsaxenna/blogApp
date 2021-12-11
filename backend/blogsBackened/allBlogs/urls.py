from django.urls import path
# from .views import  AllBlogsApiView
from . import views

urlpatterns = [
    path('allblogs/', views.allBlogsView, name = 'allblogs'),
    path('blogs/<int:user_id>',views.userBlogs, name='blogs'),
    path('likeblogs/',views.blogsLike, name='likeblogs')
]