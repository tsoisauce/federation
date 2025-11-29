import { ObjectType, Field, Int, Directive } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  bio?: string;
}
