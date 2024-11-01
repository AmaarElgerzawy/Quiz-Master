from django.urls import path
from .views import GroupCreateView, GroupDeleteView, GroupDetailView, GroupListView, GroupUpdateView, GroupListAllView, add_member_to_group, remove_member_from_group, NewsView

urlpatterns = [
    path("list_all_group/", GroupListAllView.as_view(), name="list-group"),        # GET: List all groups
    path("list_group/", GroupListView.as_view(), name="list-group"),        # GET: List all groups
    path("create_group/", GroupCreateView.as_view(), name="create-group"),  # POST: Create a new group
    path("delete_group/<int:pk>/", GroupDeleteView.as_view(), name="delete-group"),  # DELETE: Delete a group by ID
    path("detail_group/<int:pk>/", GroupDetailView.as_view(), name="detail-group"),  # GET: Retrieve a group by ID
    path("update_group/<int:pk>/", GroupUpdateView.as_view(), name="update-group"),  # PUT/PATCH: Update a group by ID
    path('<int:group_id>/add-member/', add_member_to_group, name='add_member_to_group'),
    path("delete_member/<int:group_id>/<int:member_id>/", remove_member_from_group, name='remove_member_from_group'),
    path('news/', NewsView.as_view()),           # For listing and creating news
    path('news/<int:pk>/', NewsView.as_view()),  # For retrieving, updating, and deleting specific news by ID
]