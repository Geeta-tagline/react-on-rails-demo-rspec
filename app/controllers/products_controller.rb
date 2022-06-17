class ProductsController < ApplicationController
    
	def index
		render json: {product: Product.paginate(page: params[:page], per_page: 6), allproduct: Product.all.count}
	end

	def create
		if params[:searchdata].present?
			name = params[:searchdata][:name]
				product = Product.where("name like ?", "%#{name}%").paginate(page: params[:page], per_page: 6) 
			allproduct = product.all.count if product.present?
			render json: {product: product, allproduct: allproduct}
		else
			product = Product.create(product_params)
			render json: product
		end
	end

	private

	def product_params
		params.require(:product).permit(:id, :name, :description, :size, :price, :category_id)
	end
end