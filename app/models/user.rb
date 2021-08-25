class User < ApplicationRecord

    has_secure_password

    has_many :addresses

    before_create :set_basics

    validates :name, :email, :password, :presence => true, on: :create
    validates :email, :uniqueness => true

    def set_basics
        puzzle = rand(11111...99999)
        self.slug = "#{name.parameterize}-#{puzzle}"
        self.user_type = 0
    end

    def get_name
        users.name
    end
end