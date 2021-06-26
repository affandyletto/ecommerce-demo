from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken

class ImageSerializer(serializers.ModelSerializer):	
	class Meta:
		model = Image
		fields='__all__'

class ColorSerializer(serializers.ModelSerializer):	
	class Meta:
		model = Color
		fields='__all__'

class ReviewSerializer(serializers.ModelSerializer):	
	class Meta:
		model = Review
		fields='__all__'

class ProductSerializer(serializers.ModelSerializer):
	images = ImageSerializer(many = True)
	color = ColorSerializer(many = True)
	review = ReviewSerializer(many = True)
	class Meta:
		model = Product
		fields ='__all__'

class UserSerializer(serializers.ModelSerializer):
	name = serializers.SerializerMethodField(read_only = True)
	isAdmin = serializers.SerializerMethodField(read_only = True)

	class Meta:
		model=User
		fields=['id','username','email','name','isAdmin']

	def get_isAdmin(self, obj):
		return obj.is_staff

	def get_name(self, obj):
		name = obj.first_name
		if name=='':
			name=obj.email

		return name

class UserSerializerWithToken(UserSerializer):
	token = serializers.SerializerMethodField(read_only = True)

	class Meta:
		model = User
		fields=['id','username','email','name','isAdmin','token']

	def get_token(self, obj):
		token = RefreshToken.for_user(obj)
		return str(token.access_token)
