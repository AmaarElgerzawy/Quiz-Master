from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, UserProfileImageSerializer
from rest_framework import status
from rest_framework.decorators import action

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.save()
        
        # Extract the token from the AuthToken creation tuple
        token = AuthToken.objects.create(user)[1]
        
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': token  # Only return the token part
        })

# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data
        AuthToken.objects.filter(user=user).delete()
        token = AuthToken.objects.create(user=user)[1]

        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': token
        })

# GET User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class UserEditView(generics.UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        if not request.data.get('currentPassword'):
            return Response({"detail": "Current Password is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True, context={'request': request})  # Pass the request in context
        
        if not instance.check_password(request.data.get('currentPassword')):
            return Response({"detail": "Current Password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['patch'], url_path='update-image')
    def update_image(self, request, *args, **kwargs):
        instance = self.get_object()
        if 'image' not in request.data:
            return Response({"detail": "Image file is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.get_serializer(instance, data={'image': request.data['image']}, partial=True)
        
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileImageUpdateView(generics.UpdateAPIView):
    serializer_class = UserProfileImageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.userprofile  # Get the UserProfile instance

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if 'image' not in request.data:
            return Response({"detail": "Image file is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
