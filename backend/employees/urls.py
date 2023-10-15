from django.urls import path , include
from . import views
from .views import EmployeeCreateUpdateView, EmployeeListView , AttendanceViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'attendance', AttendanceViewSet, basename='attendance')

urlpatterns = [
    path('signup/', views.SignupView.as_view(), name='signup'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('employees/<int:pk>/', EmployeeCreateUpdateView.as_view(), name='employee-create-update'),
    path('employees/', EmployeeListView.as_view(), name='employee-list'),
    path('', include(router.urls)),
]
