class CategoriesController < ApplicationController

	def index
		# binding.pry
		render json: {category: Category.paginate(page: params[:page], per_page: 4), allcategory: Category.all.count}
		# render json: Category.last
	end

	def show
	end

	def create
		category = Category.create(category_params)
		render json: category
	end

  private

    def category_params
      params.require(:category).permit(:id, :name)
    end
    
end