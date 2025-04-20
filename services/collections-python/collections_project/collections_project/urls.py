"""
URL configuration for collections_project project.
"""
from django.contrib import admin
from django.urls import path
from collections_app.views import health_check, ApolloFederationView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql', ApolloFederationView.as_view(), name='graphql'),
    path('health', health_check),
]