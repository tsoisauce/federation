# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :node, Types::NodeType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [Types::NodeType, null: true], null: true, description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ID], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World!"
    end

    field :products, [ProductType], null: false do
      description "Fetch all products"
    end

    def products
      [
        { id: "1", name: "Product 1", description: "Description for product 1", price: 10.99 },
        { id: "2", name: "Product 2", description: "Description for product 2", price: 20.99 },
        { id: "3", name: "Product 3", description: "Description for product 3", price: 30.99 }
      ]
    end

  end
end
