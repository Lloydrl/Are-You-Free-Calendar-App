from datetime import date
import email
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, username, first_name, last_name, date_of_birth, password=None):
        # Create error messages for fields that are not filled when creating a new user
        if not email:
            raise ValueError("Must enter an EMAIL ADDRESS to create an account.")
        if not username:
            raise ValueError("Must enter a USERNAME to create an account.")
        if not first_name:
            raise ValueError("Must enter a FIRST NAME to create an account.")
        if not last_name:
            raise ValueError("Must enter a LAST NAME to create an account.")
        if not date_of_birth:
            raise ValueError("Must enter a DATE OF BIRTH to create an account.")

        user = self.model(
            email = self.normalize_email(email),
                #normalize_email converts all chars to lowercase
            username = username,
            first_name = first_name,
            last_name = last_name,
            date_of_birth = date_of_birth,
        )
        #Save user
        user.set_password(password)
        user.save(using=self._db)
        return user
        
    def create_superuser(self, email, username, first_name, last_name, date_of_birth, password):
        user = self.create_user(
            email = self.normalize_email(email),
            username = username,
            password = password,
            first_name = first_name,
            last_name = last_name,
            date_of_birth = date_of_birth,
        )
        # Set permissions for superuser
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        
        #Save user
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    email = models.EmailField(max_length=100, verbose_name='email', unique=True)
    username = models.CharField(max_length=30, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    date_of_birth = models.DateField()

    # Required fields for custom user model
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'date_of_birth']

    objects = UserManager()

    def __str__(self):
        return self.first_name

    # Required functions for custom user model
    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True




