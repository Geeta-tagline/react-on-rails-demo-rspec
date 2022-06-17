class Offer < ApplicationRecord
    mount_uploader :image, ImageUploader
    serialize :image, JSON 
end
