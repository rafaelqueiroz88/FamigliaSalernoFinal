class AddDescriptionToPizza < ActiveRecord::Migration[6.1]
  def change
    add_column :pizzas, :description, :string
  end
end
