#!/usr/bin/env python
"""
Script to create collections and add products to them
"""
import os
import sys
import django
from pathlib import Path

# Add the project root to the Python path
BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))
sys.path.insert(0, str(BASE_DIR / 'collections_project'))

# Configure Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'collections_project.settings')

# Start Django 
django.setup()

from collections_app.models import Collection, CollectionItem # type: ignore

# Delete existing collections
Collection.objects.all().delete()
print("Deleted existing collections")

# Create collections
featured = Collection.objects.create(
    name="Featured Products",
    description="Our best-selling products"
)
print(f"Created collection: Featured Products (ID: {featured.id})")

new_arrivals = Collection.objects.create(
    name="New Arrivals",
    description="Latest additions to our catalog"
)
print(f"Created collection: New Arrivals (ID: {new_arrivals.id})")

# Add products to collections
# Product IDs 1-5 are from the products service (see seeds.rb)

# Add products to "Featured Products"
for product_id in [1, 3, 5]:  # Laptop, Headphones, Tablet
    CollectionItem.objects.create(
        collection=featured,
        product_id=product_id
    )
    print(f"Added product {product_id} to Featured Products")

# Add products to "New Arrivals"
for product_id in [2, 4]:  # Smartphone, Smartwatch
    CollectionItem.objects.create(
        collection=new_arrivals,
        product_id=product_id
    )
    print(f"Added product {product_id} to New Arrivals")

print("\nSetup complete!")
print(f"Total collections: {Collection.objects.count()}")
print(f"Total collection items: {CollectionItem.objects.count()}")