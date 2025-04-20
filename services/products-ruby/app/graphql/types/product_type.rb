# frozen_string_literal: true

module Types
  class ProductType < Types::BaseObject
    # Add the Apollo Federation key directive
    key fields: :id
    
    # Define the reference resolver for federation
    def self.resolve_reference(reference, _context)
      Product.find_by(id: reference[:id])
    end

    field :id, ID, null: false
    field :name, String, null: false
    field :description, String, null: true
    field :price, Float, null: false
    field :quantity, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end