from django.urls import path
from base.views.user_views import *

urlpatterns=[
	path('login/',MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
	path('profile/',GetUserProfile.as_view(), name="users_profile"),
	path('',GetUsers.as_view(), name="users"),
	path('register/',RegisterUser.as_view(),name='register'),
	path('email-verify/',VerifyEmail.as_view(),name='email-verify'),
]

