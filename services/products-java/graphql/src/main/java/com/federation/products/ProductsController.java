package com.federation.products;

import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.Arrays;
import java.util.List;

@Controller
public class ProductsController {

  private final List<Product> products = Arrays.asList(
      new Product("1", "Laptop", 1200.00),
      new Product("2", "Mouse", 25.00),
      new Product("3", "Keyboard", 75.00));

  @QueryMapping
  public List<Product> products() {
    return products;
  }
}
