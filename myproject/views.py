from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from .models import Course

def home(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    return render(request, 'contact.html')

def courses(request):
    # Тут можна буде підключити Course.objects.all()
    courses = Course.objects.all()
    courses_list = []
    return render(request, 'course.html', {'myproject': courses_list})

def course_detail(request, course_id=None):
    # Приклад з course_id
    course = {}  # get_object_or_404(Course, id=course_id) — у майбутньому
    return render(request, 'detail.html', {'myproject': course})

def team(request):
    return render(request, 'team.html')

def testimonials(request):
    return render(request, 'testimonial.html')

def feature(request):
    return render(request, 'feature.html')

class CourseListAPIView(APIView):
    def get(self, request):
        data = [
            {"id": 1, "title": "Course 1", "description": "Description of Course 1"},
            {"id": 2, "title": "Course 2", "description": "Description of Course 2"},
        ]
        return Response(data)
