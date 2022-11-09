import { Injectable } from '@nestjs/common';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  async findAllProducts(): Promise<Product[]> {
    const product = new Product();
    product.id = 1;
    product.title = 'Test product';
    product.price = 2500;
    product.description = 'this is a description for test product';
    product.handle = 'test-product';
    product.available = true;

    return [product];
  }
}
