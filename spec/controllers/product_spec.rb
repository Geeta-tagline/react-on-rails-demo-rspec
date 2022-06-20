require 'rails_helper'

RSpec.describe ProductsController, type: :controller do
   let(:product) { create(:product, :product) }

    context "for GET#Index" do
        it "get a successful response" do
            get :index
            expect(response).to be_successful
        end
    end

    context "for GET#show" do
        it "should show product" do
            get :show, params: { id: product.id}
            expect(response).to be_successful 
        end
    end

    context "for create POST#create" do
        it "should create product when params is valid" do
            post :create, params: { id: product.id, product: { name: 'geeta1', price: "100", size: "l", category_id: "1" } }
            expect(Product.last.name).to eq("geeta1")
        end
    end

    context "for update UPDATE#update" do
        it "should update product" do
            put :update, params: { id: product.id, product: { name: 'geeta' } }
            expect(Product.last.name).to eq("geeta")
        end
    end

     context "for delete DELETE#destroy" do
        it "should delete product" do
            product
            expect{ delete :destroy, params: { id: product.id } }.to change { Product.count }.by(-1)
            expect(response).to be_successful 
        end
    end
     
end
