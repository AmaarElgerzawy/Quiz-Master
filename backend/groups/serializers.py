from rest_framework import serializers
from .models import GroupModel, NewsModel
from quiz.models import QuizTaker
from django.contrib.auth.models import User

# Serializer for QuizTaker model (quizzes taken by the user)
class QuizTakerSerializer(serializers.ModelSerializer):
    quiz_title = serializers.SerializerMethodField()
    total_degree = serializers.SerializerMethodField()
    
    class Meta:
        model = QuizTaker
        fields = ['quiz', 'score', 'completed', 'started_at', 'completed_at', 'group', 'quiz_title', 'total_degree']
        
    def get_quiz_title(self, obj):
        return obj.quiz.title

    def get_total_degree(self, obj):
        return obj.get_total_degree()

# Serializer for User model (members), including quizzes taken
class UserSerializer(serializers.ModelSerializer):
    quiz_takers = QuizTakerSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'quiz_takers']

# Serializer for GroupModel
class GroupModelSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)
    owner_username = serializers.SerializerMethodField()

    class Meta:
        model = GroupModel
        fields = ['id', 'group_owner', 'group_name', 'group_description', 'group_password', 'members', 'owner_username']
        extra_kwargs = {
            'group_password': {'write_only': True}  # Hide password in response
        }

    def get_owner_username(self, obj):
        return obj.group_owner.username
    
    # Method to handle adding a member to the group
    def add_member(self, group, user):
        group.members.add(user)
        group.save()
        return group

    def create(self, validated_data):
        members_data = self.initial_data.get('members', [])
        group = GroupModel.objects.create(**validated_data)
        group.members.set(members_data)
        return group

    def update(self, instance, validated_data):
        members_data = self.initial_data.get('members', None)
        instance.group_name = validated_data.get('group_name', instance.group_name)
        instance.group_description = validated_data.get('group_description', instance.group_description)
        if 'group_password' in validated_data:
            instance.group_password = validated_data['group_password']
        instance.save()

        if members_data is not None:
            instance.members.set(members_data)

        return instance

    def remove_member(self, group, user):
        group.members.remove(user)
        group.save()
        return group

class NewsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsModel
        fields = ['id', 'title', 'content', 'created_at', 'updated_at', 'group', 'image', 'author']