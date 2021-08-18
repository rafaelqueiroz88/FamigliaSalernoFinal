class AddSlugToAddress < ActiveRecord::Migration[6.1]
  def change
    add_column :addresses, :slug, :string
  end
end
