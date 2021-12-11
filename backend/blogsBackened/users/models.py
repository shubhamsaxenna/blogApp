from django.db import models
from datetime import datetime


# Create your models here.
class Users(models.Model):
    id = models.AutoField(primary_key=True)
    firstname = models.CharField(blank=False, max_length=200)
    lastname = models.CharField(blank=False, max_length=200)
    email = models.CharField(blank=False, max_length=200)
    password = models.CharField(blank=False, max_length=200)
    # last_login_time = models.DateTimeField(default=datetime.now)
    token= models.CharField(blank=False, max_length=500)
 
    def __str__(self):
        return f"{self.id}"
