# Вказуємо базовий образ Python
FROM python:3.9-slim

# Встановлюємо робочий каталог всередині контейнера
WORKDIR /app

# Копіюємо файли requirements.txt для встановлення залежностей
COPY requirements.txt /app/requirements.txt

# Встановлюємо залежності
RUN pip install --no-cache-dir -r requirements.txt

# Копіюємо всі файли проекту у контейнер
COPY . /app

# Налаштовуємо порт, який буде використовуватися
EXPOSE 8000

# Виконуємо міграції і запускаємо сервер
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]