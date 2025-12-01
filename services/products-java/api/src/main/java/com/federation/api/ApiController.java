package com.federation.api;

import com.federation.api.models.Product;
import com.federation.api.models.Variant;

import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.Arrays;
import java.util.List;

@Controller
public class ApiController {
  private static final String SAMPLE_PIC_URL = "https://picsum.photos/200/300";

  private final List<Product> products = Arrays.asList(
      new Product("1", "Laptop", "laptop", "BrandX", "A high-end laptop", "Electronics", Arrays.asList(
          new Variant("1", "active", "Laptop 16GB RAM", 1200.00, 1200.00, "USD", "SKU-LAPTOP-1",
              Arrays.asList(SAMPLE_PIC_URL, SAMPLE_PIC_URL), 10, 0, 10),
          new Variant("2", "active", "Laptop 32GB RAM", 1500.00, 1500.00, "USD", "SKU-LAPTOP-2",
              Arrays.asList(SAMPLE_PIC_URL, SAMPLE_PIC_URL), 5, 0, 5))),
      new Product("2", "Mouse", "mouse", "BrandY", "Wireless mouse", "Accessories", Arrays.asList(
          new Variant("3", "active", "Mouse Black", 25.00, 25.00, "USD", "SKU-MOUSE-1", Arrays.asList(SAMPLE_PIC_URL),
              50, 0, 50))),
      new Product("3", "Keyboard", "keyboard", "BrandZ", "Mechanical keyboard", "Accessories", Arrays.asList(
          new Variant("4", "active", "Keyboard RGB", 75.00, 75.00, "USD", "SKU-KB-1", Arrays.asList(SAMPLE_PIC_URL, SAMPLE_PIC_URL, SAMPLE_PIC_URL), 20,
              0, 20))));

  @QueryMapping
  public List<Product> products() {
    return products;
  }
}
