from django.urls import path
from . import views

urlpatterns = [
    # Приклад маршруту для списку курсів
    path('', views.course_list, name='course_list'),
]