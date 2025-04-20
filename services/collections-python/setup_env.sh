#!/bin/bash

# Clean up any existing virtual environment
if [ -d ".venv" ]; then
    echo "Removing existing virtual environment..."
    rm -rf .venv
fi

# Create a new virtual environment with Python and pip
echo "Creating a virtual environment with standard Python..."
python -m venv .venv

# Activate the virtual environment
echo "Activating virtual environment..."
source .venv/bin/activate

# Upgrade pip in the virtual environment
echo "Upgrading pip..."
pip install --upgrade pip

# Install dependencies directly one by one
echo "Installing Django..."
pip install Django==5.0.5

echo "Installing djangorestframework..."
pip install djangorestframework==3.14.0

echo "Installing strawberry-graphql..."
pip install "strawberry-graphql==0.214.0"

echo "Installing strawberry-django..."
pip install "strawberry-django==0.29.0"

echo "Installing other dependencies..."
pip install asgiref==3.7.2 python-dotenv==1.0.0

# Display all installed packages to verify
echo "Installed packages:"
pip list

# Create a simple run script
echo "Creating a startup script..."
cat > start.sh << 'EOF'
#!/bin/bash

# Source the virtual environment
source .venv/bin/activate

# Set the proper Python path
export PYTHONPATH=$PYTHONPATH:$(pwd):$(pwd)/collections_project

# Start the Django server
cd collections_project
python manage.py migrate
python manage.py runserver 0.0.0.0:3002
EOF
chmod +x start.sh

echo "Setup complete! Start the server with:"
echo "./start.sh"