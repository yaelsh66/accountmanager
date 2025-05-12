from django.urls import path
from . import views

app_name = 'account'

urlpatterns = [
    #TODO: listview
    path('account_list', views.AccountListView.as_view(), name='account_list'),
    #detail view
    path('account_detail/<int:pk>', views.AccountDetailView.as_view(), name='account_detail'),
    #CRUD - create
    path('account_create', views.AccountCreateView.as_view(), name='account_create'),
    #CRUD - uptade
    path('account_update/<int:pk>', views.AccountUpdateView.as_view(), name='account_update'),
    #CRUD - delete
    path('account_delete/<int:pk>', views.AccountDeleteView.as_view(), name='account_delete'),
]
