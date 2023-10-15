from django.db import models
from django.contrib.auth.models import User

USER_TYPE_CHOICES = (
    ('HR', 'HR'),
    ('NE', 'Normal Employee'),
)


class Employee(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE ,null=True , blank=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(max_length=100)
    user_type = models.CharField(max_length=2, choices=USER_TYPE_CHOICES, default='NE')

    def __str__(self):
        return self.first_name + ' ' + self.last_name 
    
class Attendance(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateField()

    class Meta:
        unique_together = ('employee', 'date')


    def __str__(self):
        return self.employee.first_name + ' ' + self.employee.last_name + ' ' + str(self.date)