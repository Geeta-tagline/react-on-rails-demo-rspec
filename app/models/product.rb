class Product < ApplicationRecord
    belongs_to :category
    has_many :carts
    validates :name, presence: true, uniqueness: true
end
