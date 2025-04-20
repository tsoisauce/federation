# frozen_string_literal: true

module Resolvers
  class ProductResolver < Resolvers::BaseResolver
    type Types::ProductType, null: true

    argument :id, ID, required: true

    def resolve(id:)
      Product.find_by(id: id)
    end
  end
end