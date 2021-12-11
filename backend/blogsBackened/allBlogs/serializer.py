from rest_framework import serializers
from .models import AllBlogs

class BlogsSerializer ( serializers.ModelSerializer):
    class Meta:
        model = AllBlogs
        fields = ('subject', 'content', 'created_time','created_by')