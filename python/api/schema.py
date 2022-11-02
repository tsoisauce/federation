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
    get_user_by_email = graphene.Field(UserType, email=graphene.String())

    def resolve_test(self, info, **kwargs):
        return "Hello World!"

    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()

    def resolve_get_user_by_email(self, info, email):
        return User.objects.get(email=email)


class CreateUserMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String()
        email = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
        password = graphene.String()

    user = graphene.Field(UserType)

    @staticmethod
    def mutate(root, info, username, email, first_name, last_name, password):
        print(email)
        user = User.objects.create_user(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=password
        )
        user.save()
        return CreateUserMutation(user=user)

class Mutation(graphene.ObjectType):
    create_user = CreateUserMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
