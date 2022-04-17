from enum import Flag
from operator import truediv
from pickle import TRUE
from todo_app.models import UserInformation , TodoDetails

class UserDataManager(object):
    """ Example """
    def getUserData():
        userData=UserInformation.objects.all()
        return userData

    def add_new_user(user_data,user_eamil_data):
        checkUser=UserInformation.objects.filter(user_email=user_eamil_data).values_list('id',flat=True).first()
        if checkUser:
            return checkUser
        userId=UserInformation.objects.create(**user_data)
        return userId.id

class TodoDataManager(object):
    """ Example """

    def add_new_todo(todo_data):
        TodoDetails.objects.create(**todo_data)

    def get_todo(UserEmail):
        return TodoDetails.objects.filter(user_id__user_email=UserEmail).values('id','todo_data','is_state','user')

    def edit_state_todo(todo_id,is_state):
        TodoDetails.objects.filter(
            id= todo_id
        ).update(is_state=is_state)

    def delet_todo_data(todo_id) -> None:
        todo=TodoDetails.objects.filter(
            id__in=todo_id
        )
        if todo:
            todo.delete()
            return True
        return False
        

        