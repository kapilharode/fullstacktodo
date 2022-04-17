from django.urls import path,include
from views import UserDetails


urlpatterns = [
    path('login-user/',UserDetails)
]

