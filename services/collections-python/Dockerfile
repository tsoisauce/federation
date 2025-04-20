FROM python:3.10-slim

WORKDIR /app

# Create a virtual environment
RUN python -m venv /app/.venv
ENV PATH="/app/.venv/bin:$PATH"
ENV VIRTUAL_ENV="/app/.venv"
ENV PYTHONPATH="/app:/app/collections_project:${PYTHONPATH}"

# Upgrade pip in the virtual environment
RUN pip install --upgrade pip

# Install dependencies directly
RUN pip install Django==5.0.5 \
                djangorestframework==3.14.0 \
                "strawberry-graphql==0.214.0" \
                "strawberry-django==0.29.0" \
                asgiref==3.7.2 \
                python-dotenv==1.0.0

# Copy application code
COPY . .

EXPOSE 3002

# Start server
CMD ["sh", "-c", "cd collections_project && python manage.py migrate && python manage.py runserver 0.0.0.0:3002"]