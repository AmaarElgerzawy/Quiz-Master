from rest_framework import serializers
from .models import Quiz, Question, Answer, QuizTaker
from accounts.models import UserProfile

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'answer', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)  # Now writeable (removed read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'question', 'degree', 'answers']

    def create(self, validated_data):
        answers_data = validated_data.pop('answers', [])
        question = Question.objects.create(**validated_data)

        # Create related answers
        for answer_data in answers_data:
            Answer.objects.create(question=question, **answer_data)

        return question

    def update(self, instance, validated_data):
        instance.question = validated_data.get('question', instance.question)
        instance.degree = validated_data.get('degree', instance.degree)
        answers_data = validated_data.pop('answers', [])

        # Delete existing answers and recreate them
        instance.answers.all().delete()
        for answer_data in answers_data:
            Answer.objects.create(question=instance, **answer_data)

        instance.save()
        return instance

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)
    author = serializers.SerializerMethodField()

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'author', 'description', 'group', 'created_at', 'questions', 'taken_by']
    
    def get_author(self, obj):
        return obj.author.username if obj.author else "Unknown Author"

    def create(self, validated_data):
        questions_data = validated_data.pop('questions', [])
        author = self.context['request'].user
        
        quiz = Quiz.objects.create(author=author, **validated_data)

        # Create related questions and answers
        for question_data in questions_data:
            answers_data = question_data.pop('answers', [])
            question = Question.objects.create(quiz=quiz, **question_data)

            for answer_data in answers_data:
                Answer.objects.create(question=question, **answer_data)

        return quiz

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)

        # Update the questions and answers
        questions_data = validated_data.pop('questions', [])
        instance.questions.all().delete()  # Delete existing questions to recreate

        for question_data in questions_data:
            answers_data = question_data.pop('answers', [])
            question = Question.objects.create(quiz=instance, **question_data)

            for answer_data in answers_data:
                Answer.objects.create(question=question, **answer_data)

        instance.save()
        return instance

# Serializer for the QuizTaker model
class QuizTakerSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # Displays username
    quiz_title = serializers.SerializerMethodField()

    class Meta:
        model = QuizTaker
        fields = ['user', 'quiz', 'score', 'completed', 'started_at', 'completed_at', 'group', 'quiz_title']
    
    def get_quiz_title(self, obj):
        # Check if the quiz exists and return the title
        return obj.quiz.title if obj.quiz else None
    
class QuizTitleDescriptionSerializer(serializers.ModelSerializer):
    total_degree = serializers.SerializerMethodField()  # Add a custom field for total degree
    author = serializers.SerializerMethodField()
    quiz_taker = serializers.SerializerMethodField()

    class Meta:
        model = Quiz
        fields = ['id','title', 'description', 'author', 'total_degree', 'quiz_taker', 'created_at']  # Include total_degree with title and description    
    
    def get_total_degree(self, obj):  # The method name should be get_<field_name>
        return obj.total_degree() 
    
    def get_author(self, obj):
        author = obj.author  # The User instance
        if user_profile := UserProfile.objects.filter(user=author).first():
            return {
                "username": author.username,
                "gender": user_profile.gender  # Access gender from UserProfile
            }
        return {
            "username": author.username if author else "Unknown",
            "gender": "N/A"  # Default value when UserProfile is missing
        }

    def get_quiz_taker(self, obj):
        # Access the current user from the request context
        request = self.context.get('request')
        if not request or not hasattr(request, 'user'):
            return None  # No user in request

        user = request.user

        if quiz_taker := QuizTaker.objects.filter(user=user, quiz=obj).first():
            return {
                "user": quiz_taker.user.id,
                "quiz": quiz_taker.quiz.title,
                "score": quiz_taker.score,
                "completed": quiz_taker.completed,
                "started_at": quiz_taker.started_at,
                "completed_at": quiz_taker.completed_at
            }
        return None  # If no QuizTaker record is found
