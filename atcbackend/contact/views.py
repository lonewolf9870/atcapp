from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, csrf_exempt
from .models import Contact
from .serializers import ContactSerializer

@api_view(['POST'])
@csrf_exempt  # Keep this decorator to disable CSRF checking
def create_contact(request):
    """
    Create a new contact entry.
    """
    # Log request data for debugging
    print("Request data:", request.data)
    
    try:
        email = request.data.get('email')
        phonenumber = request.data.get('phonenumber')

        if email and Contact.objects.filter(email=email).exists():
            return Response(
                {"message": "We have already received a request with this email. We will get back to you."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if phonenumber and Contact.objects.filter(phonenumber=phonenumber).exists():
            return Response(
                {"message": "We have already received a request with this phone number. We will get back to you."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        print("Error in create_contact:", str(e))
        return Response(
            {"message": f"Server error: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )