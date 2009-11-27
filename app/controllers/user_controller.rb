class UserController < ApplicationController
  before_filter :require_login, :only=>:account

  def login
    if request.get?
      @user = User.new
    elsif request.post?
      @session = UserSession.create params[:user]
      redirect_to :action=>"account" if @session.valid?
    end
  end

  def logout
    UserSession.find.destroy rescue nil
    redirect_to :action=>"login"
  end

  def account
    render :text=>(@current_user.name rescue "Not logged in")
  end
end
