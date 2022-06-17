class AuthController < ApplicationController
  skip_before_action :require_login, only: [:login, :auto_login]

  def login
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      admin = user.username == "admin" && params[:password] == "admin"
      payload = {user_id: user.id}
      token = encode_token(payload)
      if admin.present?
        render json: {user: user, admintoken: token, success: "Welcome back admin, #{user.username}"}
      else
        render json: {user: user, jwt: token, success: "Welcome back, #{user.username}"}
      end
    else
      render json: {failure: "Log in failed! Username or password invalid!"}
    end
  end

  def auto_login
    if session_user
      render json: session_user
    else
      render json: {errors: "No User Logged In"}
    end
  end

  def user_is_authed
    render json: {message: "You are authorized"}
  end
end