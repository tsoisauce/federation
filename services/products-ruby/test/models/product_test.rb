require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  test "should slugify handle" do
    test_cases = {
      # Normal spaces and capitalization
      'Product Name' => 'product-name',
      'PRODUCT NAME' => 'product-name',
      'product name' => 'product-name',
      
      # Leading and trailing spaces
      ' Product Name ' => 'product-name',
      
      # Multiple consecutive spaces
      'Product   Name' => 'product-name',
      
      # Special characters
      'Product & Name' => 'product-name',
      'Product!Name' => 'productname',
      'Product/Name' => 'productname',
      'Product@Name' => 'productname',
      
      # Underscores
      'Product_Name' => 'productname',
      
      # Numbers
      'Product 123' => 'product-123',
      '123 Product' => '123-product',
      
      # Hyphens
      'Product-Name' => 'product-name',
      '-Product-Name-' => 'product-name',
      
      # Multiple consecutive hyphens
      'Product---Name' => 'product-name',
      
      # Combination of issues
      '!!!Product   &&&   Name!!!' => 'product-name',
      '--Product-_-@-_-Name--' => 'product-name'
    }
    
    test_cases.each do |input, expected|
      product = Product.new(name: 'Test', handle: input)
      product.save
      assert_equal expected, product.handle, "Handle '#{input}' was not properly slugified"
    end
  end

  test "should not change nil handle" do
    product = Product.new(name: 'Test')
    product.save
    assert_nil product.handle
  end

  test "should not change empty handle" do
    product = Product.new(name: 'Test', handle: '')
    product.save
    assert_equal '', product.handle
  end
end