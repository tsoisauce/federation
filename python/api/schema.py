import graphene

from graphene_django import DjangoObjectType 
from django.contrib.auth.models import User


class UserType(DjangoObjectType): 
    class Meta:
        model = User
        fields = "__all__"


class Query(graphene.ObjectType):
    test = graphene.String()
    all_users = graphene.List(UserType)

    def resolve_test(self, info, **kwargs):
        return 'Hello World!'

    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()

schema = graphene.Schema(query=Query)
