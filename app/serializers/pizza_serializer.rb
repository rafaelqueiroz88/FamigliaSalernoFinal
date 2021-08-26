class PizzaSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :value, :slug, :photo_data
end
