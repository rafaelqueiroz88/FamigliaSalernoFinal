Rails.application.routes.draw do
  
  root 'pages#index'

  # TODO: Set all routes here
  namespace :api do
    namespace :v1 do

      resources :users, params: :slug
      resources :addresses, params: :slug
      resources :pizzas, params: :slug

      # custom routes for auth
      post "/login", to: "users#login"
      get "/auto_login", to: "users#auto_login"
    end
  end

  get '*path', to: 'pages#index', via: :all
end