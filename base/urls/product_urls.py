from django.urls import path
from base.views.product_views import *

urlpatterns=[
	path('addCsv',CsvProduct,name="csv"),
	path('addProduct',GetProduct.as_view(),name="add"),
	path('<str:pk>',GetProduct.as_view(),name="product"),	
	path('delete/<str:pk>',GetProduct.as_view(),name="product"),
	path('edit/<str:pk>',GetProduct.as_view(),name="edit"),
	path('review/<str:pk>',CreateProductReview,name="product"),
	path('',GetProducts.as_view(),name="products"),

]