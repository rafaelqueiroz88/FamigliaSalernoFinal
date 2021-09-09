class Order < ApplicationRecord
  
  attr_accessor :user
  attr_accessor :pizza
  attr_accessor :address

  has_one :user
  has_one :address

  before_create :stringify
  before_save :prepare_register

  def prepare_register
    self.user_id = user
    self.address_id = address
  end

  def stringify
    self.pizzas = "[#{pizza}]"
  end
end