import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Product {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((_type) => ID)
  id: number;

  @Field()
  title: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((_type) => Int)
  price: number;

  @Field({ nullable: true })
  description?: string;

  @Field()
  handle: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((_type) => Boolean)
  available: boolean;
}
