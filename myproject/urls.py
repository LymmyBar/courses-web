"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from django.views.generic import TemplateView
from .views import CourseListAPIView


urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    path('about/', TemplateView.as_view(template_name='about.html'), name='about'),
    path('contact/', TemplateView.as_view(template_name='contact.html'), name='contact'),
    path('course/', TemplateView.as_view(template_name='course.html'), name='courses'),
    path('feature/', TemplateView.as_view(template_name='feature.html'), name='feature'),
    path('detail/', TemplateView.as_view(template_name='detail.html'), name='course_detail'),
    path('team/', TemplateView.as_view(template_name='team.html'), name='team'),
    path('testimonial/', TemplateView.as_view(template_name='testimonial.html'), name='testimonials'),
    path('course/<int:course_id>/', TemplateView.as_view(template_name='detail.html'), name='course_detail'),
    path('api/courses/', CourseListAPIView.as_view(), name='course-list'),
    path('api/courses/<int:pk>/', CourseListAPIView.as_view(), name='course-detail'),
    path('api/courses/<int:pk>/enroll/', CourseListAPIView.as_view(), name='course-enroll'),
]