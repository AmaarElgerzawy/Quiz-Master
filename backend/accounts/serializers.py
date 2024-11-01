from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from .models import UserProfile

# User Profile Serializer
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['phone', 'location', 'bio', 'gender', 'image']

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    groups = serializers.StringRelatedField(many=True)  # or you can use a nested serializer
    profile = UserProfileSerializer(source='userprofile', read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'groups', 'profile')
    
    def update(self, instance, validated_data):
        # Accessing the request from context
        request = self.context.get('request')
            
        # Handle user fields update
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        
        # Assuming profile data is in request.data
        profile_data = request.data.get('profile', {})
        
        # Correctly reference 'userprofile' rather than 'profile'
        instance.userprofile.phone = profile_data.get('phone', instance.userprofile.phone)
        instance.userprofile.location = profile_data.get('location', instance.userprofile.location)
        instance.userprofile.bio = profile_data.get('bio', instance.userprofile.bio)
        
        currentPassword = request.data.get('currentPassword')
        newPassword = request.data.get('newPassword')
        confirmPassword = request.data.get('confirmPassword')
        
        if currentPassword and newPassword and newPassword == confirmPassword:
            # Validate the current password
            if not instance.check_password(currentPassword):
                raise serializers.ValidationError({"current_password": "Current password is incorrect"})
            
            # Set the new password
            instance.set_password(newPassword)
        
        # Save both User and UserProfile
        instance.userprofile.save()
        instance.save()

        return instance

class UserProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['image']

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(required=False, allow_blank=True)
    location = serializers.CharField(required=False, allow_blank=True)
    gender = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'phone', 'location', 'gender')
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }
    
    def create(self, validated_data):
        # Extract additional fields from validated_data
        phone = validated_data.pop('phone', None)
        location = validated_data.pop('location', None)
        gender = validated_data.pop('gender', None)
        
        # Create the user
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        # Create UserProfile for additional fields
        if phone or location:
            UserProfile.objects.create(
                user=user,
                phone=phone,
                location=location,
                gender=gender
            )
        
        return user

# LOGIN Serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)

        if email and password:
            # Get the User model
            User = get_user_model()
            
            try:
                # Find the user by email
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                raise serializers.ValidationError("A user with this email was not found.")

            # Use the username field (or any unique identifier) for authenticate
            user = authenticate(username=user.username, password=password)
            
            if user and user.is_active:
                return user
            raise serializers.ValidationError("Incorrect Credentials")
        else:
            raise serializers.ValidationError("Email and Password are required")

