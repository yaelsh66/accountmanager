from typing import Any
from django.db.models.base import Model as Model
from django.db.models.query import QuerySet
from django.shortcuts import render, redirect
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import UpdateView, CreateView, DeleteView
from .models import Account
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import Http404
from django.urls import reverse_lazy

class AccountListView(ListView):
    model = Account

    def get_context_data(self, **kwargs):
        context = super(AccountListView, self).get_context_data(**kwargs)
        #filter the default list by user
        try:
            my_account_list = Account.objects.filter(user=self.request.user)
            context['my_account_list'] = my_account_list
        except:
            pass
        return context
    

class AccountDetailView(DetailView):
    model = Account

class AccountCreateView(LoginRequiredMixin, CreateView):
    model = Account
    fields=['title', 'category', 'amount', 'date', 'isStandingOrder']

    def form_valid(self, form):
        obj = form.save(commit=False)
        obj.user = self.request.user
        obj.save()
        return super().form_valid(form)

class AccountUpdateView(UpdateView):
    model = Account
    fields=['title', 'category', 'amount', 'isStandingOrder']

    def get_object(self):
        account = super(AccountUpdateView, self).get_object()
        if not account.user == self.request.user:
            raise Http404('bla bla')
        return account
    
class AccountDeleteView(LoginRequiredMixin, DeleteView):
    model = Account
    success_url = reverse_lazy('account:account_list')

    def get_object(self):
        account = super(AccountDeleteView, self).get_object()
        if not account.user == self.request.user:
            raise Http404('bla bla')
        return account