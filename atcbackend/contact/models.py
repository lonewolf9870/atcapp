from django.db import models

class Contact(models.Model):
    BUSINESS_TYPES = [
        ('footwear', 'Footwear'),
        ('hospital', 'Hospital'),
        ('restaurant', 'Restaurant'),
        ('education', 'Education'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField()
    phonenumber = models.CharField(max_length=10)
    type = models.CharField(max_length=50, choices=BUSINESS_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"
