from django.contrib import admin
from .models import Product, Order, QuoteRequest

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'brand', 'category', 'price', 'stock')
    list_filter = ('category',)
    search_fields = ('name', 'brand', 'description')
    list_editable = ('price', 'stock')
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'brand', 'category', 'description')
        }),
        ('Pricing & Stock', {
            'fields': ('price', 'stock')
        }),
        ('Media', {
            'fields': ('image_url',)
        }),
    )

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'product', 'quantity', 'ordered_at', 'status')
    list_filter = ('status', 'ordered_at')
    search_fields = ('user__username', 'product__name', 'phone')
    readonly_fields = ('ordered_at',)
    list_editable = ('status',)
    fieldsets = (
        ('Order Details', {
            'fields': ('user', 'product', 'quantity', 'address', 'phone')
        }),
        ('Status & Timeline', {
            'fields': ('status', 'ordered_at')
        }),
    )

@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'product', 'quantity', 'created_at', 'status')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username', 'product__name', 'message')
    readonly_fields = ('created_at',)
    list_editable = ('status',)
    fieldsets = (
        ('Quote Details', {
            'fields': ('user', 'product', 'quantity', 'message')
        }),
        ('Status & Timeline', {
            'fields': ('status', 'created_at')
        }),
    )