import { Resolver, Query } from '@nestjs/graphql';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((_of) => Product)
export class ProductsResolver {
  constructor(private productService: ProductsService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((_returns) => [Product])
  allProducts(): Promise<Product[]> {
    return this.productService.findAllProducts();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((_returns) => String)
  testProducts(): string {
    return '[Products] Hello World!';
  }
}
