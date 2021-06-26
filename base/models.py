from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

class Product(models.Model):
	name		= models.CharField(max_length=200, null=True, blank=True)
	price		= models.DecimalField(max_digits=20, decimal_places=5, null=True, blank=True)
	description	= models.TextField(null=True, blank=True)
	category	= models.CharField(max_length=200, null=True, blank=True)
	shipping 	= models.BooleanField(default=False, null=True, blank=True)
	featured 	= models.BooleanField(default=False, null=True, blank=True)
	stock 		= models.IntegerField(default=0, null=True, blank=True)
	brand 		= models.CharField(max_length=200, null=True, blank=True)
  
	def __str__(self):
		return str(self.id)

class Image(models.Model):
	product = models.ForeignKey(Product,related_name='images', on_delete = models.SET_NULL, null=True)
	image = models.ImageField(null=True, blank=True)
	image_url = models.CharField(max_length=500, null=True, blank=True)

	def save(self, *args, **kwargs):
		self.image_url = self.image.url
		super(Image,self).save(*args, **kwargs)


class Color(models.Model):
	product = models.ForeignKey(Product,related_name='color', on_delete = models.SET_NULL, null=True)
	color = models.CharField(max_length=200, null=True, blank=True)

class Review(models.Model):
	product = models.ForeignKey(Product, on_delete = models.SET_NULL, null=True,related_name='review')
	user = models.ForeignKey(User, on_delete = models.SET_NULL, null=True)
	name = models.CharField(max_length=200, null=True, blank=True)
	rating = models.IntegerField(null=True, blank=True, default=0)
	comment = models.TextField(null=True, blank=True)
	created = models.DateTimeField(null=True,auto_now_add=True)
	def __str__(self):
		return str(self.product.name)

class Order(models.Model):
	user = models.ForeignKey(User, on_delete = models.SET_NULL, null=True)
	paymentMethod = models.CharField(max_length=200, null=True, blank=True)
	taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
	shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
	totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
	isPaid = models.BooleanField(default=False)
	paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
	isDelivered = models.BooleanField(default=False)
	deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
	createdAt = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return str(self.createdAt)

class OrderItem(models.Model):
	product = models.ForeignKey(Product, on_delete = models.SET_NULL, null=True)
	order =  models.ForeignKey(Order, on_delete = models.SET_NULL, null=True)
	name = models.CharField(max_length=200, null=True, blank=True)
	qty = models.IntegerField(null=True, blank=True, default=0)
	price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)

	def __str__(self):
		return str(self.name)