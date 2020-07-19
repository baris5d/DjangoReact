from django.contrib.auth import get_user_model
from django.test import TestCase

from .models import Books
# Create your tests here.

class BookTestCase(TestCase):

    def test_book_created(self):
        book_obj = Books.objects.create(name='Anonymous', author='John Doe', description='lorem ipsum sit door amet.')
        self.assertEqual(book_obj.id, 1)