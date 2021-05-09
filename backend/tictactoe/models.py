from django.db import models

# Create your models here.
class History(models.Model):
  title = models.TextField()
  text = ''
  creation_date = models.DateTimeField(auto_now_add = True, editable=False)
  class Meta:
      get_latest_by = 'creation_date'
      
  def _str_(self):
    return self.title
  