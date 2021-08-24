class Pizza < ApplicationRecord

    before_create :slugify

    def slugify
        puzzle = rand(11111...99999)
        self.slug = "#{name.parameterize}-#{puzzle}"
    end

    def get_name
        pizzas.name
    end
end