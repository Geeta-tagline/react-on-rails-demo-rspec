require 'rails_helper'

RSpec.describe User, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  describe ".my_class_method" do
    
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
      #  it { should validate_presence_of(:username) }
      
      it 'ensure username presence' do
        user = User.new().save
        expect(user).to eq(false)
      end

      it 'should save successfully' do
        user = User.new(username: "geeta", password: "123").save
        expect(user).to eq(true)
      end

      it 'should save successfully if user is not admin' do
        user = User.new(username: "geeta", password: "123")
        admin = user.username == "admin"
        expect(admin).to eq(false)
      end

    end

    context 'scope tests' do
      let! (:params) { {username: "geeta", password: "123"} }
      
        before(:each) do
          User.new(params).save
          User.new(params).save
          User.new(params.merge(active: true)).save
          User.new(params.merge(active: false)).save
          User.new(params.merge(active: false)).save
        end

        # it "should return active user" do
        #   expect(User.active_users.size).to eq(27)
        # end

        # it "should return inactive user" do
        #   expect(User.inactive_users.size).to eq(2)
        # end

        it "should return active user factory" do
          expect(@useractive.active)
        end

        it "should return inactive user factory" do
          expect(@userinactive.active).to eq(false) 
        end


    end

  end

end
