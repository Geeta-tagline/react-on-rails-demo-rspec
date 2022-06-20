class UsersController < ApplicationController
  skip_before_action :require_login, only: [:create]

  def index
    user = User.all
    render json: {user: user}
  end

  def create
    username = User.find_by_username(params[:username])
    user = User.create(user_params) 
    if username.present?
      render json: {errors: "username already exist"}, status: :not_acceptable 
    elsif user.valid?
      admin = user.username == "admin"
      payload = {user_id: user.id}
      token = encode_token(payload)
      if admin.present?
        render json: {user: user, admintoken: token}
      else
        render json: {user: user, jwt: token}
      end
    else
        render json: {errors: user.errors.full_messages}, status: :not_acceptable
    end
  end

  def show
    user = User.find_by(params[:id])
    render json: {user: user}
  end

  def destroy
    User.destroy(params[:id])
  end

  def update
    user = User.update(user_params)
    render json: {user: user}
  end

  private 

  def user_params
    params.permit(:username, :password)
  end
end