# your_app/serializers.py
from rest_framework import serializers
from .models import Expenses, Category

class ExpensesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expenses
        fields = ['id', 'purchase_date', 'bussines_name', 'amount', 'card', 'charge_date', 'purchase_type', 'discount', 'notes', 'category']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category_name']
        