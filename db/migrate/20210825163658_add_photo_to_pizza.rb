class AddPhotoToPizza < ActiveRecord::Migration[6.1]
  def change
    add_column :pizzas, :photo_data, :string
  end
end
