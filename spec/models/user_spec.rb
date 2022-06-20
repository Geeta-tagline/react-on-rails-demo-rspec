require 'rails_helper'

RSpec.describe User, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  describe "validation" do
    
    before(:all) do
      @user1 = create(:user, :user)
      @useractive = create(:user, :activeuser)
      @userinactive = create(:user, :inactiveuser)
    end
  
    context 'validate test' do
      it "is valid with valid attributes" do
        expect(@user1).to be_valid
      end

       it "is not valid without a username" do 
        user2 = build(:user,  username: nil)
        expect(user2).to_not be_valid
      end
      
      it 'ensure username presence' do
        user = User.new().save
        expect(user).to eq(false)
      end

      it 'should save successfully' do
        user = User.new(username: "geeta", password: "123").save
        expect(user).to eq(true)
      end

      it 'should save successfully if user is not admin' do
        admin = @user1.username == "admin"
        expect(admin).to eq(false)
      end
    end

    context 'scope tests' do

      it "should return active user factory" do
        expect(@useractive.active).to eq(true)
      end

      it "should return inactive user factory" do
        expect(@userinactive.active).to eq(false)
      end
    end

  end

  describe "Routes", :type => :routing do
    it "routes get index" do
      expect(:get => "fruit").to route_to(
        :controller => "home",
        :action => "index"
      )
    end
  end

end
