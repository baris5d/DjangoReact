from django import forms 

from .models import Books

class BooksForm(forms.ModelForm):
    class Meta:
        model = Books
        fields = ['name','author','description']
    def clean_description(self):
        description = self.cleaned_data.get('description')
        if len(description) > 300:
            raise forms.ValidationError("This is too long")
        return description