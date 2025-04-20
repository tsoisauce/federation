from django.http import JsonResponse
import os
import json
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.utils.decorators import method_decorator
from .schema import schema
from strawberry.django.views import GraphQLView

# Health check view
def health_check(request):
    return JsonResponse({"status": "ok", "service": "collections-python"})

# Read the federation schema from file
SCHEMA_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'schema.graphql')
with open(SCHEMA_PATH, 'r') as f:
    SCHEMA_SDL = f.read()

@method_decorator(csrf_exempt, name='dispatch')
class ApolloFederationView(View):
    """
    Custom Django view that handles Apollo Federation queries
    alongside regular GraphQL queries
    """
    def post(self, request):
        # Parse the request body
        try:
            data = json.loads(request.body)
            query = data.get('query', '')
            
            # Handle Apollo Federation service definition query
            if "_service" in query and "sdl" in query:
                response_data = {
                    "data": {
                        "_service": {
                            "sdl": SCHEMA_SDL
                        }
                    }
                }
                return JsonResponse(response_data)
            
            # For all other queries, delegate to Strawberry's GraphQL view
            return GraphQLView.as_view(schema=schema)(request)
            
        except Exception as e:
            return JsonResponse({"errors": [{"message": str(e)}]}, status=400)
    
    def get(self, request):
        # Optionally handle GET requests with GraphiQL
        return GraphQLView.as_view(schema=schema, graphiql=True)(request)