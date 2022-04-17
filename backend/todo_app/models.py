from django.db import models

class UserInformation(models.Model):
    id = models.AutoField(max_length=11,primary_key=True)
    user_name= models.CharField(max_length=50)
    user_email= models.CharField(max_length=50)
    user_flag = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user_name

class TodoDetails(models.Model):
    id = models.AutoField(max_length=11,primary_key=True)
    todo_data= models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    is_state = models.IntegerField(default=0)
    user = models.ForeignKey(UserInformation, on_delete=models.SET_NULL,blank=True,null= True)

    def __str__(self):
        return 'UserDetails({})'.format(self.id)