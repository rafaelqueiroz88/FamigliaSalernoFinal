class PizzaSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :value
end
