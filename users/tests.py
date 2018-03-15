
from django.core import mail
from allauth.account.models import EmailAddress
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase
from .models import User
# Create your tests here.


class TestRegister(APITestCase):
    def test_user_registration(self):
        response = self.client.post(
            reverse('rest_register'),
            {"email": "tom@fake.com", "password1": "password12", "password2": "password12"}
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].to[0], 'tom@fake.com')


class TestLogin(APITestCase):
    def test_user_login(self):
        username = 'testuser'
        password = 'testpass'
        email = 'tom@fake.com'
        user = User.objects.create_user(username, password=password, email=email)
        EmailAddress.objects.create(user=user, email=email, primary=True, verified=True)
        response = self.client.post(
            reverse('rest_login'),
            {"email": email, "password": password}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['key'])
