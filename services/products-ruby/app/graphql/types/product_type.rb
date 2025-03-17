module Types
  class ProductType < Types::BaseObject
    include ApolloFederation::Object

    key fields: "id"

    field :id, ID, null: false
    field :name, String, null: false
    field :description, String, null: true
    field :price, Float, null: false
  end
end
