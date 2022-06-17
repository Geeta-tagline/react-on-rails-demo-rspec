class AddImageToOffers < ActiveRecord::Migration[6.1]
  def change
    add_column :offers, :image, :string
  end
end
