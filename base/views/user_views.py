from base.models import *
from rest_framework import mixins
from rest_framework import generics
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.http import Http404
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken
from base.utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import jwt
from django.conf import settings
from rest_framework import status
from django.shortcuts import render, redirect


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
	def validate(self, attrs):
		password = attrs.get("password")
		data = super().validate(attrs)

		serializer = UserSerializerWithToken(self.user).data
		for k,v in serializer.items():
			data[k] = v
		print(data)
		return data

class MyTokenObtainPairView(TokenObtainPairView):
	serializer_class = MyTokenObtainPairSerializer

class RegisterUser(APIView):
	def post(self, request, format=None):
		data = request.data
		print(data)
		user = User.objects.create(
			first_name=data['name'],
			username=data['username'],
			email=data['email'],
			password = make_password(data['password']),
			is_active=False
		)
		user.save()
		serializer = UserSerializerWithToken(user, many=False)
		user_data=serializer.data
		token = RefreshToken.for_user(user).access_token

		current_site = get_current_site(request).domain
		relativeLink=reverse('email-verify')
		absurl='http://'+current_site+relativeLink+"?token="+str(token)
		email_body = 'Hi '+user.username+"Use link below to verify your email \n"+absurl
		
		datas={
		"email_body":email_body,
		'to_email':user.email,
		'email_subject':'Verify your email'}

		Util.send_email(datas)

		return Response(user_data)

class VerifyEmail(generics.GenericAPIView):
	def get(self,request):
		token=request.GET.get('token')
		print(token)
		try:
			payload=jwt.decode(token, "django-insecure-9tqqgcmxt^@7hsv6u3%y#*=%u(i93_xh$2q#)^+y64926==c5e", algorithms='HS256')
			user=User.objects.get(id=payload['user_id'])
			user.is_active=True
			user.save()
			return redirect("/#/login")
		except jwt.ExpiredSignatureError as e:
			return Response({'error':"Activation Expired"}, status=status.HTTP_400_BAD_REQUEST)


class GetUserProfile(APIView):
	permission_classes = [IsAuthenticated]
	def get(self, request, format=None):
		user = request.user
		serializer = UserSerializer(user, many=False)
		return Response(serializer.data)

class GetUsers(APIView):
	permission_classes = [IsAdminUser]
	def get(self, request, format=None):
		users = User.objects.all()
		serializer = UserSerializer(users, many=True)
		return Response(serializer.data)