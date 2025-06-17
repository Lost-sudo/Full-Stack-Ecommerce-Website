from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin, BaseUserManager
from django.utils.text import slugify

# Custom user manage to handle user and superuser creation
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        
        email = self.normalize_email(email=email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        # Ensure that the superuser has the required fields set
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)
    
# Custom User model that extends AbstractUser and PermissionsMixin
class User(AbstractUser, PermissionsMixin):
    username = None # Disable the default username field
    email = models.EmailField(unique=True, verbose_name="Email Address")
    full_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_seller = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    objects = UserManager()

    USERNAME_FIELD = 'email' # Use email for login
    REQUIRED_FIELDS = ['full_name']

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ['email']
    
    def __str__(self):
        return self.email
    
    # Check if the user has a regular profile
    def has_profile(self):
        return hasattr(self, 'user_profile')
    
    # Check if the user has a seller profile
    def has_seller_profile(self):
        return hasattr(self, 'seller_profile')
    
# One-to-one relationship for the normal users
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user_profile")
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    
    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"

    def __str__(self):
        return f"{self.user.email} Profile"

class ShippingAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="addresses")
    recipient_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    address_line = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)

    is_default = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Address"
        verbose_name_plural = "Addresses"
        ordering = ['is_default', 'id']

    def __str__(self):
        return f"{self.address_line}, {self.city}, {self.country}"

# One-to-one relationship for seller users    
class SellerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="seller_profile")
    shop_name = models.CharField(max_length=255, verbose_name="Shop Name")
    shop_description = models.TextField(blank=True)
    shop_address = models.CharField(max_length=255)
    shop_contact_number = models.CharField(max_length=15, blank=True)
    shop_logo = models.ImageField(upload_to='shop_logos/', null=True, blank=True)
    is_verified = models.BooleanField(default=False, verbose_name="Is Verified")
    slug = models.SlugField(unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Seller Profile"
        verbose_name_plural = "Seller Profiles"
        ordering = ['shop_name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.shop_name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.shop_name} - {self.user.email}"
