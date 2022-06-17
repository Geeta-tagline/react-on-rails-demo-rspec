class Category < ApplicationRecord
    has_many :carts
    has_many :products
end
