from django.contrib import admin
from .models import Quiz, Question, Answer, QuizTaker

# Register your models here.
class QuizAdmin(admin.ModelAdmin):
    list_display = ['id' ,'title', 'author','total_degree', 'group']

class AnswerInlineModel(admin.TabularInline):
    model = Answer
    fields = ["answer","is_correct"]

class QuestionAdmin(admin.ModelAdmin):
    fields = ["question", "quiz"]
    list_display = ["question", "quiz", "created_at"]
    inlines = [AnswerInlineModel]

class AnswerAdmin(admin.ModelAdmin):
    list_display = ["question","answer", "is_correct"]

admin.site.register(QuizTaker)
admin.site.register(Quiz, QuizAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer, AnswerAdmin)
