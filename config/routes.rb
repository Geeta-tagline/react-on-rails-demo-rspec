Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "home#index"
    get "/fruit", to: "home#index"
    get "/alloffer", to: "home#index"
    get "/newoffer", to: "home#index"
    get "/offer", to: "home#index"
    get "/product", to: "home#index"
    get "/newproduct", to: "home#index"
    get "/newcategory", to: "home#index"
    get "/category", to: "home#index"
    get "/cart", to: "home#index"
   resources :categories
   resource :users, only: [:create]
    post "/login", to: "auth#login"
    get "/auto_login", to: "auth#auto_login"
    get "/user_is_authed", to: "auth#user_is_authed"
    resources :carts, only: [:index, :create, :destroy, :update]
    resources :products, only: [:index, :create, :destroy, :update]
    resources :offers, only: [:index, :create, :destroy, :update]

  namespace :api do 
    namespace :v1 do 
      resources :fruits, only: [:index, :create, :destroy, :update]
    end 
  end 
end
