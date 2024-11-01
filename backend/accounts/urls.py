from django.urls import path, include
from .user_views import RegisterAPI, LoginAPI, UserAPI, UserEditView, UserProfileImageUpdateView
from knox import views as knox_views

urlpatterns = [
    path('register/', RegisterAPI.as_view()),
    path('login/', LoginAPI.as_view(), name='login'),
    path('', include('knox.urls')), 
    path('user/', UserAPI.as_view()),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('edit_user/', UserEditView.as_view(), name='edit_user'),
    path('edit/update-image/', UserProfileImageUpdateView.as_view(), name='user_update_image'),]