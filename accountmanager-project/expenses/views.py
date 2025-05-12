# your_app/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
import pandas as pd
from .models import Expenses, Category
from .serializers import ExpensesSerializer, CategorySerializer
from rest_framework import status, generics
from rest_framework.renderers import JSONRenderer

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ExpensesDetailView(generics.RetrieveUpdateAPIView):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer


class ExpensesListView(APIView):
    def get(self, request):

        # Fetch all the expenses from the database
        expenses = Expenses.objects.all()
        
        # Serialize the expenses data
        serializer = ExpensesSerializer(expenses, many=True)
        
        # Return the serialized data as JSON
        return Response(serializer.data, status=status.HTTP_200_OK)



class ExcelUploadView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, format=None):
        file_obj = request.FILES['file']
        
        # Read without headers and skip the header row manually (optional)
        df = pd.read_excel(file_obj, engine='openpyxl', header=None, skiprows=1)
        df = df[:-1]  # Skip last row if needed

        # Optional: print first few rows for debug
        print('Raw data preview:')
        print(df.head())

        for _, row in df.iterrows():
            try:
                purchase_date = pd.to_datetime(row[0], dayfirst=True, errors='coerce')
                charge_date = pd.to_datetime(row[4], dayfirst=True, errors='coerce')

                if pd.isna(purchase_date) or pd.isna(charge_date):
                    continue  # Skip invalid dates

                Expenses.objects.create(
                    purchase_date=purchase_date,
                    bussines_name=row[1],
                    amount=row[2] if pd.notna(row[2]) else None,
                    card=row[3],
                    charge_date=charge_date,
                    purchase_type=row[5] if pd.notna(row[5]) else None,
                    discount=row[6] if pd.notna(row[6]) else None,
                    notes=row[7] if pd.notna(row[7]) else None
                    
                )
            except IndexError:
                # Skip rows that don’t have enough columns
                continue

        return Response({"message": "File processed successfully"}, status=200)
