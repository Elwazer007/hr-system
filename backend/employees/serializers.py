
from rest_framework import serializers
from .models import Employee , Attendance


from rest_framework import serializers
import re

def camel_to_snake(name):
    name = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', name).lower()

class BaseSerializer(serializers.ModelSerializer):
    def to_internal_value(self, data):
        snake_case_data = {camel_to_snake(key): value for key, value in data.items()}
        return super().to_internal_value(snake_case_data)

class EmployeeSerializer(BaseSerializer):
    class Meta:
        model = Employee
        fields = ['id' ,'first_name', 'last_name', 'email', 'user_type']

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ['employee', 'date']
