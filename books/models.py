from django.db import models

# Create your models here.
class Books(models.Model):
    # id = models.AutoField(primary_key=True)
    name = models.TextField(blank=False, null=False)
    author = models.TextField(blank=False, null=False)
    description = models.TextField()
    image = models.FileField(upload_to='images/', blank=True, null=True)
    