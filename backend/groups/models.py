from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User

def get_system_admin():
    try:
        return User.objects.get(username='admin').id
    except User.DoesNotExist:
        return None  # Or create an admin user if needed

# Create your models here.
class GroupModel(models.Model):
    group_owner = models.ForeignKey(User, verbose_name=_("Group Owner"), default=get_system_admin, on_delete=models.SET_DEFAULT, related_name="owned_groups")
    group_name = models.CharField(_("Group Name"), max_length=200)
    group_description = models.TextField(_("Group Description"))
    group_password = models.CharField(_("Group Password"), max_length=50)
    members = models.ManyToManyField(User, verbose_name=_("Members"), related_name="group_memberships")

    def __str__(self):
        return self.group_name
    
    def get_group_owner_username(self):
        return self.group_owner.username

class NewsModel(models.Model):
    title = models.CharField(_("Title"), max_length=200)
    content = models.TextField(_("Content"))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    group = models.ForeignKey(GroupModel, on_delete=models.CASCADE, related_name="news")
    image = models.ImageField(_("Image"), upload_to="news/", null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='news')
    
    def __str__(self):
        return self.title
