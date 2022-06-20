require 'rails_helper'

RSpec.describe Product, type: :model do
   let(:product) { create(:product, :product) }

   describe "Relationship" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name) }  
    it {should have_many(:carts) }
    it {belong_to(:category) }
  end
end