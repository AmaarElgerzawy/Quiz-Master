from rest_framework import generics
from .models import Quiz, Question, Answer, QuizTaker
from .serializers import QuizSerializer, QuestionSerializer, AnswerSerializer, QuizTitleDescriptionSerializer, QuizTakerSerializer
from groups.models import GroupModel

class QuizListCreateView(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    
class QuizTitleDescriptionListView(generics.ListAPIView):
    queryset = Quiz.objects.all()  # Get all quizzes
    serializer_class = QuizTitleDescriptionSerializer 
    
    def get_queryset(self):
        user_groups = GroupModel.objects.filter(members=self.request.user)
        # Return quizzes that belong to any of the groups the user is a member of
        return Quiz.objects.filter(group__in=user_groups).distinct()   

class QuestionListCreateView(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class AnswerListCreateView(generics.ListCreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

class QuizDetailView(generics.RetrieveAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class QuizTakerView(generics.ListCreateAPIView):
    queryset = QuizTaker.objects.all()
    serializer_class = QuizTakerSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)