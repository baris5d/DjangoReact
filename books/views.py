from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render,redirect
from django.utils.http import is_safe_url

from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import ensure_csrf_cookie

from .models import Books
from .form import BooksForm
from django.conf import settings 
from .serializer import BooksSerializer


ALLOWED_HOSTS = settings.ALLOWED_HOSTS

def home_view(request, *args, **kwargs):
    return render(request, 'pages/home.html', context={}, status=200)

@api_view(['GET'])
def books_list(request, *args, **kwargs):
    blist = Books.objects.all()
    books = [x.serialize() for x in blist]
    data = {
        "response" : books
    }
    return Response(data)

@api_view(['GET'])
def book_detail_view(request, book_id, *args, **kwargs):
    data = { 
        "id" : book_id
    }
    status = 200
    try:
        obj = Books.objects.get(id=book_id)
        data['name'] = obj.name
        data['author'] = obj.author
        data['description'] = obj.description

    except:
        data['message'] = "Not Found"
        status = 404
    return Response(data,status=status) 

@api_view(['POST'])
@ensure_csrf_cookie
def book_create_view(request, *args, **kwargs):
    serializer = BooksSerializer(data=request.data or None)
    if serializer.is_valid(raise_exception = True):
        serializer.save()
        return Response(serializer.data)
    return Response({}, status=400)

# without serializer
def book_create_view_pure(request, *args, **kwargs):
    form = BooksForm(request.POST or None)
    next_url = request.POST.get('next') or None
    if form.is_valid():
        obj = form.save(commit=False)
        obj.save()
        if next_url != None and is_safe_url(next_url,ALLOWED_HOSTS):
            return redirect(next_url)
        form = BooksForm()
    return render(request, 'components/form.html', context={'form': form})