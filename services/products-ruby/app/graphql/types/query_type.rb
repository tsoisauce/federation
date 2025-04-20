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

    # Products fields
    field :products, [Types::ProductType], null: false,
      description: "Returns a list of products"
    def products
      Product.all
    end

    field :product, Types::ProductType, null: true do
      description "Find a product by ID"
      argument :id, ID, required: true
    end
    def product(id:)
      Product.find_by(id: id)
    end
  end
end
