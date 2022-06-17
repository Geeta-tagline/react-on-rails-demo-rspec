class UsersController < ApplicationController
  skip_before_action :require_login, only: [:create]
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

  private 

  def user_params
    params.permit(:username, :password)
  end
end