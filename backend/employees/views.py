from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import generics, permissions , viewsets
from rest_framework import status 
from .models import Employee , Attendance
from .serializers import EmployeeSerializer , AttendanceSerializer

class SignupView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Create the User.
        user = User.objects.create_user(username=username, password=password)
        # Create the Employee.
        token = Token.objects.create(user=user)

        return Response({"token": token.key}, status=status.HTTP_201_CREATED)
    

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            try:
                employee = Employee.objects.get(user=user)
                if employee.user_type == 'HR':
                    token, _ = Token.objects.get_or_create(user=user)
                    return Response({"token": token.key})
                else:
                    return Response({"message": "Not allowed"}, status=status.HTTP_403_FORBIDDEN)
            except Employee.DoesNotExist:
                return Response({"message": "Not allowed"}, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({"message": "Invalid username or password"}, status=status.HTTP_400_BAD_REQUEST)



class HRPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.employee.user_type == 'HR'


class EmployeeCreateUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [HRPermission]

    def get_object(self):
        instance = self.get_queryset().filter(id=self.kwargs.get('pk')).first()
        if instance:
            return instance
        return None

class EmployeeListView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [HRPermission]

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [HRPermission]
