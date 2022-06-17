class CartsController < ApplicationController

    def index
			cart = Product.joins(:carts, :category).select("products.name, products.size,products.price, categories.name As c_name").paginate(page: params[:page], per_page: 6)
			render json: {cart: cart, allcart: Cart.all.count}
    end

		def create
			if cart = Cart.find_by(cart_params)
				render json: {cart_exist: "already aded to cart"}
			else
				cart = Cart.create(cart_params)
				render json: cart
			end
			
		end

    def destroy
    end

    private

			def cart_params
				params.require(:carts).permit(:id, :product_id, :category_id)
			end

end