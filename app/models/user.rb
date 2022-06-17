class User < ApplicationRecord
	has_secure_password
	scope :active_users, -> {where(active: true)}
	scope :inactive_users, -> {where(active: false)}
	validates :username, presence: true, uniqueness: true
end
