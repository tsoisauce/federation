#!/usr/bin/env python
"""
Simple runner to start the Django server with the proper path configuration.
This helps avoid import errors.
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

if __name__ == "__main__":
    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)