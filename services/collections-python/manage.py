#!/bin/sh
# Create a symbolic link to make running manage.py easier from the service root
exec python collections_project/manage.py "$@"