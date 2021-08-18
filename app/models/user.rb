class User < ApplicationRecord

    has_many :addresses

    before_create :slugify

    def slugify
        puzzle = rand(11111...99999)
        self.slug = "#{name.parameterize}-#{puzzle}"
    end

    def get_name
        users.name
    end
end