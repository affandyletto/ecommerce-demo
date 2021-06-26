from base.models import *
from base.serializers import ProductSerializer
from rest_framework import mixins
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.http import Http404
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.core import files
from io import BytesIO
import requests

class GetProducts(APIView):
    def get(self, request, format=None):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)



class GetProduct(APIView):
    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404
    def post(self, request, format=None):
        data=request.data
        obj=Product.objects.create()
        obj.save()
        data["shipping"]=True if data["shipping"] == "TRUE" else False
        data["featured"]=True if data["featured"]=="TRUE" else False 
        keys=["shipping","featured"]
        for key, value in data.items():
            setattr(obj, key, value)
        obj.save()

        url = data['image']
        resp = requests.get(url)
        if resp.status_code != requests.codes.ok:
            return Response("URL ERROR")
        fp = BytesIO()
        fp.write(resp.content)
        gambar=Image.objects.create(product=obj,image="null", image_url=image)
        gambar.image.save(file_name, files.File(fp))
        gambar.save()
        
        color = Color.objects.create(product=obj, color=data['color'])
        color.save()

        return Response("Product Created")

    def get(self, request, pk, format=None):
        product = self.get_object(pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def put(self, request, pk, format=None):        
        data=request.data
        obj = Product.objects.get(id=pk)
        for key, value in data.items():
            setattr(obj, key, value)
        obj.save()
        return Response("SESUATU")

    def delete(self, request, pk, format=None):
        product = self.get_object(pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def CreateProductReview(request, pk):
    user = request.user
    product = Product.objects.get(id=pk)
    data = request.data
    alreadyExists = product.review.filter(user=user).exists()

    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.username,
            rating=data['rating'],
            comment=data['comment'],
        )

        return Response('Review Added')

@api_view(['POST'])
def CsvProduct(request):
    data=request.data["data"]
    i=0
    for a in data:
        name=data[i].get("name")
        price=data[i].get("price")
        brand=data[i].get("brand")
        description=data[i].get("description")
        category=data[i].get("category")
        shipping=data[i].get("shipping")
        featured=data[i].get("featured")
        stock=data[i].get("stock")
        image=data[i].get("image")
        color = data[i].get("color")
        shippingB=True if shipping == "TRUE" else False

        featuredB=True if featured=="TRUE" else False

        url = image
        resp = requests.get(url)
        if resp.status_code != requests.codes.ok:
            print("MBOH ERROR E NAK NDI")
            return Response("URL ERROR")
        fp = BytesIO()
        fp.write(resp.content)
        produk=Product.objects.create(name=name,price=price,brand=brand,description=description,category=category,shipping=shippingB,featured=featuredB,stock=stock)
        produk.save()
        file_name = url.split("/")[-1]        
        gambar=Image.objects.create(product=produk,image="null", image_url=image)
        gambar.save()
        gambar.image.save(file_name, files.File(fp))
        gambar.save()
        
        color = Color.objects.create(product=produk, color=color)
        color.save()
        print(produk.name+" CREATED")
        i+=1
        

    return Response('')