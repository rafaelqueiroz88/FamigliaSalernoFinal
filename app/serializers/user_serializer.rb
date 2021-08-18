class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :email, :type, :slug
end
