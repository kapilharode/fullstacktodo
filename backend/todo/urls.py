"""todo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include,re_path
from todo_app.views import UserDetails,TodoDetails,TodoFilterData,DeleteTask


urlpatterns = [
    path('admin/', admin.site.urls),
    path('users-login/', UserDetails.as_view()),
    path('todo-details/', TodoDetails.as_view()),
    path('todo-details-data/', TodoFilterData.as_view()),
    re_path(r'^todo-details/(?P<id>[0-9]+)$',TodoDetails.as_view()),
    path('delete-tasks/', DeleteTask.as_view()),
    
]
 