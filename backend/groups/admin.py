from django.contrib import admin
from .models import GroupModel, NewsModel

class GroupAdmin(admin.ModelAdmin):
    list_display = ["id", "group_name", "group_owner"]
# Register your models here.

admin.site.register(GroupModel, GroupAdmin)
admin.site.register(NewsModel)