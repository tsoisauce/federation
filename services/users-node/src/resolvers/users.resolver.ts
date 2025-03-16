import { Resolver, Query, ObjectType, Field, ID, Args } from '@nestjs/graphql';

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

const users: User[] = [
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

@Resolver(() => User)
export class UsersResolver {
  @Query(() => [User])
  getUsers(): User[] {
    return users;
  }

  @Query(() => User, { nullable: true })
  getUserById(@Args('id', { type: () => ID }) id: string): User | undefined {
    return users.find((user) => user.id === id);
  }

  @Query(() => User, { nullable: true })
  getUserByEmail(
    @Args('email', { type: () => String }) email: string,
  ): User | undefined {
    return users.find((user) => user.email === email);
  }
}
