from rest_framework.views import APIView
from rest_framework.response import Response

from django.shortcuts import render, get_object_or_404

def home(request):
    # Логіка для головної сторінки
    return render(request, 'index.html', {})

def about(request):
    # Логіка для сторінки "Про нас"
    return render(request, 'about.html', {})

def contact(request):
    # Логіка для сторінки контактів
    return render(request, 'contact.html', {})

def courses(request):
    # Логіка для відображення списку курсів
    # Припустімо, у вас є модель Course
    # courses_list = Course.objects.all()
    courses_list = []  # замініть на реальні дані
    return render(request, 'course.html', {'courses': courses_list})

def course_detail(request, course_id):
    # Логіка для відображення деталей конкретного курсу
    # course = get_object_or_404(Course, id=course_id)
    course = {}  # замініть на реальні дані
    return render(request, 'detail.html', {'course': course})

def team(request):
    # Логіка для сторінки команди
    return render(request, 'team.html', {})

def testimonials(request):
    # Логіка для сторінки відгуків
    return render(request, 'testimonial.html', {})

class CourseListAPIView(APIView):
    def get(self, request):
        data = [
            {"id": 1, "title": "Course 1", "description": "Description of Course 1"},
            {"id": 2, "title": "Course 2", "description": "Description of Course 2"},
        ]
        return Response(data)