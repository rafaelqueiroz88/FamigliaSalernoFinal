Rails.application.routes.draw do
  
  root 'pages#index'

  # TODO: Set all routes here
  namespace :api do
    namespace :v1 do

      resources :users, param: :slug
      resources :addresses, param: :slug
      resources :pizzas, param: :slug

      # custom routes for file uploads
      match "/pizza/attachment/:slug", to: "pizzas#attachment", via: :patch

      # custom route for address
      get "/addresses_by_user/:slug", to: "addresses#get_addresses_by_user"

      # custom routes for auth
      post "/login", to: "users#login"
      get "/auto_login", to: "users#auto_login"
    end
  end

  get '*path', to: 'pages#index', via: :all
end