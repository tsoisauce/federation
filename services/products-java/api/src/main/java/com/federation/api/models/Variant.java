package com.federation.api.models;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Variant {
  private String id;
  private String status;
  private String title;
  private Double displayPrice;
  private Double price;
  private String currency;
  private String sku;
  private List<String> images;
  private Integer onHandQuantity;
  private Integer committedQuantity;
  private Integer availableToSellQuantity;
}
