
from django.test import TestCase, Client
from django.urls import reverse
from .models import Course, Category
from django.contrib.auth import get_user_model
from datetime import date

User = get_user_model()

class CourseViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.category = Category.objects.create(name="Тестова категорія")
        self.teacher = User.objects.create_user(username="teacher", email="t@example.com", password="1234")
        self.course = Course.objects.create(
            title="Тестовий курс",
            category=self.category,
            description="Опис курсу",
            start_date=date.today(),
            duration_weeks=3,
            price=100,
            difficulty=Course.DifficultyLevel.BEGINNER,
        )
        self.course.instructors.add(self.teacher)

    def test_course_creation(self):
        course_count = Course.objects.count()
        Course.objects.create(
            title="Ще курс",
            category=self.category,
            description="Інший опис",
            start_date=date.today(),
            duration_weeks=2,
            price=50,
        )
        self.assertEqual(Course.objects.count(), course_count + 1)

    def test_course_list_view(self):
        url = reverse('courses')  
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'course.html')
        self.assertContains(response, self.course.title)

    def test_templates_rendering(self):
        pages = [
            ('home', 'index.html'),
            ('about', 'about.html'),
            ('contact', 'contact.html'),
            ('courses', 'course.html'),
            ('course_detail', 'detail.html', [self.course.id]),
            ('team', 'team.html'),
            ('testimonials', 'testimonial.html'),
            ('feature', 'feature.html'),
        ]
        for page in pages:
            if len(page) == 2:
                url = reverse(page[0])
                template = page[1]
            else:
                url = reverse(page[0], args=page[2])
                template = page[1]
            resp = self.client.get(url)
            self.assertEqual(resp.status_code, 200)
            self.assertTemplateUsed(resp, template)