from rest_framework.views import APIView
from rest_framework.response import Response

class CourseListAPIView(APIView):
    def get(self, request):
        data = [
            {"id": 1, "title": "Course 1", "description": "Description of Course 1"},
            {"id": 2, "title": "Course 2", "description": "Description of Course 2"},
        ]
        return Response(data)