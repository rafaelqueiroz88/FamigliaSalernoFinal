class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :email, :user_type, :slug
end
