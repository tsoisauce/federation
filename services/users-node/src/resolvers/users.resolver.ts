import { Resolver, Query, Args, ID, ResolveReference } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { nullable: true })
  async user(@Args('id', { type: () => ID }) id: string): Promise<User | null> {
    return this.usersService.findById(id);
  }

  @Query(() => User, { nullable: true })
  async userByEmail(
    @Args('email', { type: () => String }) email: string,
  ): Promise<User | null> {
    return this.usersService.findByEmail(email);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }): Promise<User | null> {
    return this.usersService.findById(reference.id);
  }
}