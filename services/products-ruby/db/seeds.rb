# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Create sample products
products = [
  {
    name: 'Laptop',
    description: 'High-performance laptop with the latest processor',
    price: 1299.99,
    quantity: 10
  },
  {
    name: 'Smartphone',
    description: 'Latest smartphone with advanced camera features',
    price: 899.99,
    quantity: 15
  },
  {
    name: 'Headphones',
    description: 'Noise-cancelling wireless headphones',
    price: 249.99,
    quantity: 20
  },
  {
    name: 'Smartwatch',
    description: 'Fitness tracker with heart rate monitoring',
    price: 199.99,
    quantity: 12
  },
  {
    name: 'Tablet',
    description: 'Lightweight tablet with high-resolution display',
    price: 499.99,
    quantity: 8
  }
]

products.each do |product_attrs|
  Product.find_or_create_by!(name: product_attrs[:name]) do |product|
    product.assign_attributes(product_attrs)
  end
end

puts "Created #{Product.count} products"
