from rest_framework import generics, mixins
from .models import GroupModel, NewsModel
from .serializers import GroupModelSerializer, NewsModelSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db import models

# View to list all GroupModel instances
class GroupListAllView(generics.ListAPIView):
    queryset = GroupModel.objects.all()
    serializer_class = GroupModelSerializer

class GroupListView(generics.ListAPIView):
    serializer_class = GroupModelSerializer

    def get_queryset(self):
        # Return only the groups where the logged-in user is the group owner
        return GroupModel.objects.filter(group_owner=self.request.user)

# View to retrieve a single GroupModel by its ID
class GroupDetailView(generics.RetrieveAPIView):
    queryset = GroupModel.objects.all()
    serializer_class = GroupModelSerializer

# View to create a new GroupModel
class GroupCreateView(generics.CreateAPIView):
    queryset = GroupModel.objects.all()
    serializer_class = GroupModelSerializer

# View to update an existing GroupModel
class GroupUpdateView(generics.UpdateAPIView):
    queryset = GroupModel.objects.all()
    serializer_class = GroupModelSerializer

# View to delete a GroupModel by its ID
class GroupDeleteView(generics.DestroyAPIView):
    queryset = GroupModel.objects.all()
    serializer_class = GroupModelSerializer

@api_view(['POST'])
def add_member_to_group(request, group_id):
    # Get the group by its ID
    try:
        group = GroupModel.objects.get(id=group_id)
    except GroupModel.DoesNotExist:
        return Response({"error": "Group not found"}, status=status.HTTP_404_NOT_FOUND)

    # Get the user from the token
    user = request.user  # This is set by the JWTAuthentication

    # Get the password from the request data
    provided_password = request.data.get('group_password')
    if not provided_password:
        return Response({"error": "Group password not provided"}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the provided password matches the group's password
    if group.group_password != provided_password:
        return Response({"error": "Incorrect group password"}, status=status.HTTP_403_FORBIDDEN)

    # Add the user to the group using the serializer method
    serializer = GroupModelSerializer()
    serializer.add_member(group, user)

    return Response({"message": f"User {user.username} added to group {group.group_name} successfully"}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_member_from_group(request, group_id, student_id):
    try:
        group = GroupModel.objects.get(id=group_id)
    except GroupModel.DoesNotExist:
        return Response({"error": "Group not found"}, status=status.HTTP_404_NOT_FOUND)
    
    # Get the user from the token
    user = request.user  # This is set by the JWTAuthentication

    # Check if the user is the group owner
    if group.group_owner != user:
        return Response({"error": "You do not have permission to remove members from this group"}, status=status.HTTP_403_FORBIDDEN)

    # Remove the user from the group using the serializer method
    serializer = GroupModelSerializer()
    serializer.remove_member(group, user, student_id)

    return Response({"message": f"User {user.username} removed from group {group.group_name} successfully"}, status=status.HTTP_200_OK)

class NewsView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    serializer_class = NewsModelSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Get groups where the user is either a member or the group owner
        user_groups = GroupModel.objects.filter(
            models.Q(members=self.request.user) | models.Q(group_owner=self.request.user)
        )
        # Return news for those groups
        return NewsModel.objects.filter(group__in=user_groups)

    # Handle GET request for listing or retrieving news
    def get(self, request, *args, **kwargs):
        if 'pk' in kwargs:
            return self.retrieve(request, *args, **kwargs)  # For retrieving a single news item
        return self.list(request, *args, **kwargs)  # For listing all news

    # Handle POST request to create a news item
    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        data['author'] = request.user.id  # Set the current user as the author
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Handle PUT request to update a news item
    def put(self, request, *args, **kwargs):
        data = request.data.copy()
        data['author'] = request.user.id  # Ensure author remains consistent

        # No need to pass request.FILES, it's handled automatically
        serializer = self.get_serializer(instance=self.get_object(), data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    # Handle DELETE request to delete a news item
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    # Optional: Customize perform_create to handle any additional logic
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)  # Set the user as the author on create

