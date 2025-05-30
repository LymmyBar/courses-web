from django.contrib import admin
from django.urls import path, include
from . import views  # імпортуємо функції з views.py

urlpatterns = [
    path('admin/', admin.site.urls),

    # HTML сторінки
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('course/', views.courses, name='courses'),
    path('feature/', views.feature, name='feature'),
    path('detail/', views.course_detail, name='course_detail'),
    path('course/<int:course_id>/', views.course_detail, name='course_detail_with_id'),
    path('team/', views.team, name='team'),
    path('testimonial/', views.testimonials, name='testimonials'),

    # API
    path('api/courses/', views.CourseListAPIView.as_view(), name='course-list'),
    path('api/courses/<int:pk>/', views.CourseListAPIView.as_view(), name='course-detail'),
    path('api/courses/<int:pk>/enroll/', views.CourseListAPIView.as_view(), name='course-enroll'),

    # URL-и з app `courses`
    path('courses/', include('courses.urls')),
]
