from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('TMT', 'TMT Steel Bars'),
        ('CEMENT', 'Cements'),
        ('PIPES', 'Pipes'),
        ('ROOFING', 'Roofing Sheets'),
        ('ADHESIVE', 'Tile Adhesives'),
        ('GUTTER', 'UPVC Rain Gutters'),
    ]
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100, blank=True)  # e.g., Kairali, ACC
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.URLField(blank=True, null=True)
    stock = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.brand} {self.name}" if self.brand else self.name

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    address = models.TextField()
    phone = models.CharField(max_length=15)
    ordered_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='Pending')  # Pending, Confirmed, Shipped, Delivered

    def __str__(self):
        return f"Order #{self.id} - {self.user.username}"

class QuoteRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='Pending')

    def __str__(self):
        return f"Quote #{self.id} - {self.user.username}"