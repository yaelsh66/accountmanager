from django.db import models
from datetime import date

class Category(models.Model):
    category_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.category_name

class Expenses(models.Model): 
    purchase_date = models.DateField(default=date.today, null=True, blank=True)
    bussines_name = models.CharField(max_length=100, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    card = models.CharField(max_length=500, null=True, blank=True)
    charge_date = models.DateField(default=date.today, null=True, blank=True)
    purchase_type=models.TextField(null=True, blank=True)
    discount = models.TextField(default=False, null=True, blank=True)
    notes = models.TextField(max_length=500, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    submit_date = models.DateField(default=date.today)
    
    def __str__(self):
        return f"{self.purchase_date} - {self.bussines_name} - {self.amount}"
 

    
class File(models.Model):
    file = models.FileField(upload_to="excel") 


     
