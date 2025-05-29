# courses/models.py
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()

class Category(models.Model):
    """Категорії курсів: Програмування, Дизайн, Маркетинг тощо."""
    name = models.CharField(_('Назва'), max_length=100, unique=True)
    description = models.TextField(_('Опис'), blank=True)
    created_at = models.DateTimeField(_('Створено'), auto_now_add=True)

    class Meta:
        verbose_name = _('Категорія')
        verbose_name_plural = _('Категорії')
        ordering = ['name']

    def __str__(self):
        return self.name


class Course(models.Model):
    """Основна модель Курсу."""
    class DifficultyLevel(models.TextChoices):
        BEGINNER = 'BG', _('Початківець')
        INTERMEDIATE = 'IM', _('Середній')
        ADVANCED = 'AD', _('Просунутий')

    title = models.CharField(_('Назва курсу'), max_length=200)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True,
        related_name='courses', verbose_name=_('Категорія')
    )
    description = models.TextField(_('Опис'))
    instructors = models.ManyToManyField(
        User, related_name='courses_taught', verbose_name=_('Викладачі')
    )
    start_date = models.DateField(_('Початок'))
    duration_weeks = models.PositiveIntegerField(_('Тривалість (тижнів)'))
    price = models.DecimalField(_('Ціна (USD)'), max_digits=8, decimal_places=2)
    difficulty = models.CharField(
        _('Рівень'), max_length=2,
        choices=DifficultyLevel.choices,
        default=DifficultyLevel.INTERMEDIATE
    )
    is_active = models.BooleanField(_('Активний'), default=True)
    created_at = models.DateTimeField(_('Створено'), auto_now_add=True)

    class Meta:
        verbose_name = _('Курс')
        verbose_name_plural = _('Курси')
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    @property
    def enrolled_count(self):
        return self.enrollments.count()


class Enrollment(models.Model):
    """Реєстрація студента на курс."""
    student = models.ForeignKey(
        User, on_delete=models.CASCADE,
        related_name='enrollments', verbose_name=_('Студент')
    )
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE,
        related_name='enrollments', verbose_name=_('Курс')
    )
    enrolled_at = models.DateTimeField(_('Дата реєстрації'), auto_now_add=True)
    is_completed = models.BooleanField(_('Завершено'), default=False)

    class Meta:
        unique_together = [['student', 'course']]
        verbose_name = _('Реєстрація')
        verbose_name_plural = _('Реєстрації')

    def __str__(self):
        return f"{self.student.email} → {self.course.title}"


class Lesson(models.Model):
    """Один урок в межах курсу."""
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE,
        related_name='lessons', verbose_name=_('Курс')
    )
    title = models.CharField(_('Назва уроку'), max_length=200)
    content = models.TextField(_('Зміст'))
    order = models.PositiveIntegerField(_('Номер уроку'))
    video_url = models.URLField(_('URL відео'), blank=True)
    created_at = models.DateTimeField(_('Створено'), auto_now_add=True)

    class Meta:
        unique_together = [['course', 'order']]
        ordering = ['order']
        verbose_name = _('Урок')
        verbose_name_plural = _('Уроки')

    def __str__(self):
        return f"{self.course.title} — {self.order}. {self.title}"
