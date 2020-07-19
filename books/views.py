from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render,redirect
from django.utils.http import is_safe_url
from .models import Books
from .form import BooksForm


def home_view(request, *args, **kwargs):
    return render(request, 'pages/home.html', context={}, status=200)

def books_list(request, *args, **kwargs):
    blist = Books.objects.all()
    books = [x.serialize() for x in blist]
    data = {
        "response" : books
    }
    return JsonResponse(data)

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
    return JsonResponse(data,status=status) 


def book_create_view(request, *args, **kwargs):
    form = BooksForm(request.POST or None)
    next_url = request.POST.get('next') or None
    if form.is_valid():
        obj = form.save(commit=False)
        obj.save()
        if next_url != None and is_safe_url(next_url):
            return redirect(next_url)
        form = BooksForm()
    return render(request, 'components/form.html', context={'form': form})