class Address < ApplicationRecord
    
    has_one :user

    before_create :slugify

    def slugify
        puzzle = rand(11111...99999)
        self.slug = "#{description.parameterize}-#{puzzle}"
    end

    def get_name
        addresses.name
    end
end