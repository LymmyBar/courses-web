from django.contrib import admin
from django.urls import path, include  # <–– include обовʼязково!

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('courses.urls')),  # ← домашня сторінка – ваш app
]
