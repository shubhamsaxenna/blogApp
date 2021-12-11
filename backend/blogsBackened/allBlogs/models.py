from django.db import models
from datetime import datetime
from users.models import Users



# Create your models here.
class AllBlogs(models.Model):
    id = models.AutoField(primary_key=True)
    subject = models.TextField(blank=False, null=False, default= "none")
    content = models.TextField(blank=False, null=False, default= "none")
    created_time = models.DateTimeField(default=datetime.now)
    likes = models.IntegerField(default=0)
    created_by = models.ForeignKey(Users, on_delete=models.CASCADE, default = 0)
 

    def __str__(self):
        return f"{self.subject}-{self.created_by}"
