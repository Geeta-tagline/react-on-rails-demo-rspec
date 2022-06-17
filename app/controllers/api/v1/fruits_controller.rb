class Api::V1::FruitsController < ApplicationController
  def index
    # render json: Fruit.all
    # binding.pry
    render json: {fruitdata: Fruit.paginate(page: params[:page], per_page: 4), allfruit: Fruit.all.count}
  end

  def create
    if params[:searchdata].present?
      searchdata
    else
      fruit = Fruit.create(fruit_params)
      render json: fruit
    end
  end

  def destroy
    Fruit.destroy(params[:id])
  end

  def update
    fruit = Fruit.find(params[:id])
    fruit.update(fruit_params)
    render json: fruit
  end

  def searchdata
    params[:searchdata].each do |key, val|
      instance_variable_set("@#{key}".to_sym, val)
    end

    if @sort.present?
      fruit = Fruit.paginate(page: params[:page], per_page: 4).order('name DESC')
      render json: {fruitdata: fruit, allfruit: Fruit.all.count}
    elsif @sortname.present?
      fruit = Fruit.paginate(page: params[:page], per_page: 4).order('name ASC')
      render json: {fruitdata: fruit, allfruit: Fruit.all.count}
    elsif @sortdesc.present?
      fruit = Fruit.paginate(page: params[:page], per_page: 4).order('description DESC')
      render json: {fruitdata: fruit, allfruit: Fruit.all.count}
    elsif @sortdescription.present?
      fruit = Fruit.paginate(page: params[:page], per_page: 4).order('description ASC')
      render json: {fruitdata: fruit, allfruit: Fruit.all.count}
    else
      # binding.pry
      if @name.present? && @description.present?
        fruit = Fruit.where("name like ?", "%#{@name}%").paginate(page: params[:page], per_page: 4) 
      elsif @description.present?
        fruit = Fruit.where("description like ?", "%#{@description}%").paginate(page: params[:page], per_page: 4) 
      elsif @name.present?
        fruit = Fruit.where("description like ? AND name like ?", "%#{@description}%", "%#{@name}%").paginate(page: params[:page], per_page: 4) 
      elsif !@name.present? && !@description.present?
        fruit = Fruit.paginate(page: params[:page], per_page: 4)
      end
      allfruit = fruit.all.count if fruit.present?
      render json: {fruitdata: fruit, allfruit: allfruit}
    end

  end

  private

  def fruit_params
    params.require(:fruit).permit(:id, :name, :description)
  end
end