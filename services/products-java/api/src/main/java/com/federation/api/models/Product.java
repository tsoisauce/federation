package com.federation.api.models;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
  private String id;
  private String title;
  private String slug;
  private String brand;
  private String description;
  private String category;
  private List<Variant> variants;
}
