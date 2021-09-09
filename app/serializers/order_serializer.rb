class OrderSerializer
    include FastJsonapi::ObjectSerializer
    attributes :user_id, :pizzas, :address_id
  end  