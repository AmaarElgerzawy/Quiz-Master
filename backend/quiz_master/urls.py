from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/quiz/", include("quiz.urls")),  # Added trailing slash
    path("api/auth/", include("accounts.urls")),  # Added trailing slash
    path("api/groups/", include("groups.urls")),  # Added trailing slash
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)