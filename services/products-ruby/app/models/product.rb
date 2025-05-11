class Product < ApplicationRecord
  before_save :slugify_handle

  private

  def slugify_handle
    if handle.present?
      # Convert to lowercase, replace spaces with hyphens
      # Remove any characters that aren't lowercase letters, numbers, or hyphens
      self.handle = handle.downcase
                          .gsub(/\s+/, '-')
                          .gsub(/[^a-z0-9\-]/, '')
                          .gsub(/-+/, '-')   # Replace multiple hyphens with a single hyphen
                          .gsub(/^-|-$/, '') # Remove leading and trailing hyphens
    end
  end
end
