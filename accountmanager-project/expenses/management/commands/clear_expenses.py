from django.core.management.base import BaseCommand
from expenses.models import Expenses

class Command(BaseCommand):
    help = 'Clears all expenses from the database'

    def handle(self, *args, **kwargs):
        Expenses.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Successfully cleared all expenses.'))
