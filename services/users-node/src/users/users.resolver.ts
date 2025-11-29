import { Resolver, Query, Mutation, Args, Int, ResolveReference } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int, nullable: true }) id?: number, @Args('email', { nullable: true }) email?: string): User {
    if (id) {
      return this.usersService.findOne(id);
    }
    if (email) {
      return this.usersService.findByEmail(email);
    }
    throw new Error('You must provide either an id or an email');
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput): User {
    return this.usersService.createUser(createUserInput);
  }

  @Mutation(() => User)
  updateUser(@Args('id', { type: () => Int }) id: number, @Args('updateUserInput') updateUserInput: UpdateUserInput): User {
    return this.usersService.updateUser(id, updateUserInput);
  }

  @Mutation(() => User)
  deleteUser(@Args('id', { type: () => Int }) id: number): User {
    return this.usersService.deleteUser(id);
  }

  // Federation reference resolver
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    return this.usersService.findOne(reference.id);
  }
}
