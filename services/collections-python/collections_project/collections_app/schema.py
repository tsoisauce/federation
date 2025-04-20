import strawberry # type: ignore
from typing import List, Optional, Dict, Any
from . import models

# Service type for Apollo Federation
@strawberry.type
class ServiceType:
    sdl: str


# Product type - referenced from products service
@strawberry.type
class Product:
    id: strawberry.ID


# Collection type
@strawberry.type
class Collection:
    id: strawberry.ID
    name: str
    description: Optional[str]
    
    @strawberry.field
    def products(self) -> List[Product]:
        try:
            collection_obj = models.Collection.objects.get(id=self.id)
            collection_items = models.CollectionItem.objects.filter(collection=collection_obj)
            return [Product(id=strawberry.ID(str(item.product_id))) for item in collection_items]
        except Exception:
            return []


# Create Mutations
@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_collection(self, name: str, description: Optional[str] = None) -> Collection:
        collection = models.Collection.objects.create(
            name=name,
            description=description
        )
        return Collection(
            id=strawberry.ID(str(collection.id)),
            name=collection.name,
            description=collection.description
        )
    
    @strawberry.mutation
    def add_product_to_collection(self, collection_id: strawberry.ID, product_id: strawberry.ID) -> bool:
        try:
            collection = models.Collection.objects.get(id=int(collection_id))
            models.CollectionItem.objects.create(
                collection=collection,
                product_id=int(product_id)
            )
            return True
        except Exception:
            return False
    
    @strawberry.mutation
    def remove_product_from_collection(self, collection_id: strawberry.ID, product_id: strawberry.ID) -> bool:
        try:
            result = models.CollectionItem.objects.filter(
                collection_id=int(collection_id),
                product_id=int(product_id)
            ).delete()
            return result[0] > 0
        except Exception:
            return False


# Create Queries
@strawberry.type
class Query:
    # Collection fields
    @strawberry.field
    def collections(self) -> List[Collection]:
        collection_objs = models.Collection.objects.all()
        return [
            Collection(
                id=strawberry.ID(str(collection.id)),
                name=collection.name,
                description=collection.description
            )
            for collection in collection_objs
        ]
    
    @strawberry.field
    def collection(self, id: strawberry.ID) -> Optional[Collection]:
        try:
            collection = models.Collection.objects.get(id=int(id))
            return Collection(
                id=strawberry.ID(str(collection.id)),
                name=collection.name,
                description=collection.description
            )
        except models.Collection.DoesNotExist:
            return None


# Create the schema
schema = strawberry.Schema(
    query=Query,
    mutation=Mutation,
)