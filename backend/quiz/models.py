from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User

# Function to get or return the system admin user
def get_system_admin():
    try:
        return User.objects.get(username='admin')
    except User.DoesNotExist:
        return None  # Or create an admin user if needed

class Quiz(models.Model):
    title = models.CharField(_("Quiz Title"), max_length=255, default=_("Quiz"))
    description = models.TextField(_("Quiz_Description"), default="This Is A Quiz")
    author = models.ForeignKey(User, related_name="quizzes", on_delete=get_system_admin, null=False)
    group = models.ForeignKey('groups.GroupModel', related_name="quizzes", on_delete=models.SET_NULL, null=True)
    taken_by = models.ManyToManyField(User, through='QuizTaker', related_name='taken_quizzes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["id"]

    @property
    def author_username(self):
        return self.author.username if self.author else "Unknown Author"
    
    @property
    def question_count(self):
        return self.questions.count()
        # Add this method to calculate the total degree
        
    def total_degree(self):
        return self.questions.aggregate(total_degree=models.Sum('degree'))['total_degree'] or 0
    

    def __str__(self):
        return f"{self.title} by {self.author_username}"


class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="questions")
    question = models.TextField(_("Question"))
    degree = models.IntegerField(_("Degree"), default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.question

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="answers")
    answer = models.TextField(_("Answer"))
    is_correct = models.BooleanField(_("Is Correct"), default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.answer

class QuizTaker(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quiz_takers')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='quiz_takers')
    group = models.ForeignKey('groups.GroupModel', on_delete=models.CASCADE, related_name='quiz_takers', null=True)
    score = models.IntegerField(_("Score"), default=0)
    completed = models.BooleanField(_("Completed"), default=False)
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, auto_now=False)  # Allow manual setting of completion time

    class Meta:
        unique_together = ['user', 'quiz']
        ordering = ["completed_at"]
    
    def get_quiz_title(self):
        return self.quiz.title

    def get_total_degree(self):
        return self.quiz.total_degree()
    
    def __str__(self):
        return f"{self.user.username} - {self.quiz.title}"