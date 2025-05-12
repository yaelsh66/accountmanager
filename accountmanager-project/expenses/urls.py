from django.urls import path
from .views import ExcelUploadView, ExpensesListView, CategoryListCreateView, ExpensesDetailView

urlpatterns = [
    path('api/upload/', ExcelUploadView.as_view(), name='excel-upload'),
    path('api/sorting/', ExpensesListView.as_view(), name='expenses-sorting'),
    path('api/categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('api/expenses/<int:pk>/', ExpensesDetailView.as_view()),

]

    