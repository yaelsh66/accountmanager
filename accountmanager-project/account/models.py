from django.db import models
from django.contrib.auth import get_user_model
from django.shortcuts import reverse

class Account(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    title = models.TextField(max_length=1200)
    category = models.IntegerField(default=0)
    amount = models.IntegerField(null=False, default=0)
    date = models.DateField(default=None)
    isStandingOrder = models.BooleanField(default=False)

    def __str__(self):
        return self.title


    def get_absolute_url(self):
        return reverse('account:account_detail', kwargs={'pk': self.pk})

