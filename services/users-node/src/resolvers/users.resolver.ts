import { Resolver, Query, ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  email!: string;
}

@Resolver(() => User)
export class UsersResolver {
  @Query(() => [User])
  getUsers(): User[] {
    return [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@example.com',
      },
    ];
  }
}
