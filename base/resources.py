from import_export import resources
from .models import *

class ProductAdminResources(resources.ModelResource):
    class Meta:
        model   =   Product
        skip_unchanged = True
        report_skipped = True
        exclude = ('id',)