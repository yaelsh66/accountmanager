# Generated by Django 5.1.1 on 2025-05-08 19:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("expenses", "0002_expenses_discount_expenses_notes"),
    ]

    operations = [
        migrations.AddField(
            model_name="expenses",
            name="purchase_type",
            field=models.TimeField(blank=True, null=True),
        ),
    ]
