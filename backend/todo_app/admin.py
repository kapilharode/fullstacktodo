from django.contrib import admin
from .models import UserInformation, TodoDetails
 
# Register your models here.
admin.site.register(UserInformation)
admin.site.register(TodoDetails)