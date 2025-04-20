from django.contrib import admin
from .models import Collection, CollectionItem

@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at', 'updated_at')
    search_fields = ('name', 'description')

@admin.register(CollectionItem)
class CollectionItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'collection', 'product_id', 'added_at')
    list_filter = ('collection',)
    search_fields = ('collection__name', 'product_id')