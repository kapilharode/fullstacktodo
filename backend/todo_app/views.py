from marshal import load
from django.shortcuts import render
import json
import rest_framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK
from todo_app.utils import UserDataManager ,TodoDataManager

class UserDetails(APIView):
    def get(self, request):
        userData=UserDataManager.getUserData()
        return Response(
            data =userData,
            status=HTTP_200_OK
        )

    def post(self, request, *args, **kwargs):
        user_data = json.loads(request.POST.get('userData'))
        user_eamil_data = user_data.get('user_email')
        if not user_eamil_data:
            return Response(data='Invalid Data', status=HTTP_400_BAD_REQUEST)
        user_ids =UserDataManager.add_new_user(user_data,user_eamil_data)
        return Response(data=user_ids,status=HTTP_200_OK)

class TodoDetails(APIView):

    def post(self, request):
        todo_data = json.loads(request.POST.get('todoData'))
        UserId = int(todo_data.get('user_id'))
        if not UserId:
            return Response(data='Invalid Data', status=HTTP_400_BAD_REQUEST)
        TodoDataManager.add_new_todo(todo_data)
        return Response(data='successfully Add Todo Data', status=HTTP_200_OK)
    
    def put(self, request,*args, **kwargs):
        payload_data = json.loads(request.body)
        todo_id= payload_data.get("ids")
        is_state=payload_data.get('isStateData')

        if not all([todo_id]):
            raise Exception("Invalid Data!")

        TodoDataManager.edit_state_todo(todo_id,is_state)
        return Response(data='successfully edit Data', status=HTTP_200_OK)

    def delete(self,request,*args, **kwargs):
        id = kwargs.get('id')
        delete_record =TodoDataManager.delet_todo_data([id])
        if not delete_record:
            return Response(data='Invalid Data', status=HTTP_400_BAD_REQUEST)
        return Response(data='successfully Delete Todo Data', status=HTTP_200_OK)

class TodoFilterData(APIView):
    def post(self, request):
        UserEmail=json.loads(request.POST.get('userIdData'))
        todo_data_list=TodoDataManager.get_todo(UserEmail)
        return Response(
            data=todo_data_list,
            status=HTTP_200_OK
        )

class DeleteTask(APIView):
    def post(self, request):
        userDeleteId=json.loads(request.POST.get('userDeleteId'))
        delete_record =TodoDataManager.delet_todo_data(userDeleteId)
        if not delete_record:
            return Response(data='Invalid Data', status=HTTP_400_BAD_REQUEST)
        return Response(data='successfully Delete Todo Data', status=HTTP_200_OK)
   