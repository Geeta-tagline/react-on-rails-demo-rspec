require 'rails_helper'

RSpec.describe UsersController, type: :controller do
   let(:user) { create(:user, :user) }

    context "GET#Index" do
        it "get a successful response" do
            get :index
            expect(response).to be_successful
        end
    end

    context "for GET#show" do
        it "should show user" do
            get :show, params: { id: user.id}
            expect(response).to be_successful 
        end
    end

    context "for create POST#create" do
        it "should create user when params is valid" do
            expect(User.last.username).to eq("geeta")
        end
    end

    context "for update UPDATE#update" do
        it "should update user" do
            put :update, params: { id: user.id, user: { username: 'geeta' } }
            expect(User.last.username).to eq("geeta")
        end
    end

     context "for delete DELETE#destroy" do
        it "should delete user" do
            user
            expect{ delete :destroy, params: { id: user.id } }.to change { User.count }.by(-1)
            expect(response).to be_successful 
        end
    end
     
end
