class CreateAddresses < ActiveRecord::Migration[6.1]
  def change
    create_table :addresses do |t|
      t.string :description
      t.string :street
      t.string :number
      t.string :zipcode
      t.string :note
      t.string :reference

      t.timestamps
    end
  end
end
