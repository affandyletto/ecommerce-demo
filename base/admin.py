from django.contrib import admin
from .models import *
from import_export.admin import ImportExportModelAdmin
from .resources import *

# Register your models here.
@admin.register(Product)
@admin.register(Order)
@admin.register(OrderItem)
@admin.register(Image)
@admin.register(Review)
@admin.register(Color)
class ProductAdmin(ImportExportModelAdmin):
	resource_class  = ProductAdminResources
	exclude = ('id',)