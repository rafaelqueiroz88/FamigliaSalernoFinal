class AddressSerializer
    include FastJsonapi::ObjectSerializer
    attributes :description, :street, :number, :zipcode, :note, :reference, :user_id, :slug
  end  