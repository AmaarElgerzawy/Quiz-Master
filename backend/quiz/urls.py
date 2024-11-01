from django.urls import path
from .views import QuizListCreateView, QuestionListCreateView, AnswerListCreateView, QuizDetailView, QuizTitleDescriptionListView, QuizTakerView

urlpatterns = [
    path('quizzes/', QuizListCreateView.as_view(), name='quiz-create'),
    path('quizzes/quizes_overview/', QuizTitleDescriptionListView.as_view(), name='quizes_overview'),
    path('quiz/<int:pk>', QuizDetailView.as_view(), name='quiz-detail'),
    path('questions/', QuestionListCreateView.as_view(), name='question-create'),
    path('answers/', AnswerListCreateView.as_view(), name='answer-create'),
    path('quiztaker/' , QuizTakerView.as_view(), name='quiz-taker'),
]
