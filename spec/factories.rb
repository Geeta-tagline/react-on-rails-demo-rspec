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

  factory :product do

    trait :product do
      name {"geeta"}
      description {"123"}
      price {"100"}
      size {"l"}
      category_id {"1"}
    end

  end

end