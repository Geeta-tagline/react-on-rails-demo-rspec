FactoryBot.define do
  factory :user do
		
    trait :user do
      username {"geeta"}
      password {"123"}
    end
    
    trait :activeuser do
      username {"geeta"}
      password {"123"}
      active {"true"}
    end

     trait :inactiveuser do
        username {"geeta"}
        password {"123"}
        active {"false"}
    end
  end
end