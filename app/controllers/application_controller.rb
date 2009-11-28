# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

require 'authlogic'

class ApplicationController < ActionController::Base

  helper :all # include all helpers, all the time

  before_filter :login_session

  def login_session
    @current_user = UserSession.find.user rescue nil
  end

  def require_login
    UserSession.find or redirect_to login_url
  end
end
