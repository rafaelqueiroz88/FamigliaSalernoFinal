class PizzaSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :value, :slug, :photo_data
end
