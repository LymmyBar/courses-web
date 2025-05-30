from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render, get_object_or_404
from courses.models import Course
from django.shortcuts import render
from django.core.paginator import Paginator



def home(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    return render(request, 'contact.html')

def courses(request):
    # Отримуємо всі курси з бази даних
    course_list = Course.objects.all()
    # Розбиваємо на сторінки по 6 курсів
    paginator = Paginator(course_list, 6)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, 'course.html', {
        'page_obj': page_obj,
        'request': request,  # щоб отримати request.GET.q у шаблоні
    })

def course_detail(request, course_id=None):
    # Приклад з course_id
    course = get_object_or_404(Course, id=course_id)
    return render(request, 'detail.html', {'course': course})

def team(request):
    return render(request, 'team.html')

def testimonials(request):
    return render(request, 'testimonial.html')

def feature(request):
    return render(request, 'feature.html')

class CourseListAPIView(APIView):
    def get(self, request):
        courses = Course.objects.all()  # Отримуємо всі курси
        data = [
            {"id": course.id, "title": course.title, "description": course.description}
            for course in courses
        ]
        return Response(data)
