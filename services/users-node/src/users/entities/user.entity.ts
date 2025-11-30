import { ObjectType, Field, Int, Directive } from "@nestjs/graphql";
import type { UUID } from "crypto";

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  uuid: UUID;

  @Field({ nullable: false, description: "First name of the user" })
  firstName: string;

  @Field({ nullable: false, description: "Last name of the user" })
  lastName: string;

  @Field({ nullable: false, description: "Email of the user" })
  email: string;

  @Field({ nullable: true, description: "Bio of the user" })
  bio?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;  
}
