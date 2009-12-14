class EmbedController < ApplicationController
  layout nil

=begin
This is a little tricky.

We can't use XHR because we're on a differnet domain, and the SWF workarounds
aren't working out. So, we'll have bookmarklet.js create script tags that load
/embed/a/b, where a is the method we want to run, and b is the DOM id we want
to splice it into.

This hits index, which calls the method and renders back RJS that updates the
right element. The methods all render whatever they render (as long as it's
text) and *return it as a string*, otherwise we get a double render error.

Because this is a gigantic hack, we use it as sparingly as possible, and keep
it confined to this controller, which handles anything embedded into outside
pages (the share dialog).
=end

  def index
    error = nil
    content = nil

    begin
      content = self.send params[:method]
    rescue
      error = $!.to_s
    end

    render :update do |page|
      if error
        page.alert error
      else
        page.replace_html params[:update], content
      end
    end
  end

  def landing
    @domain = "http://"+request.host_with_port
  end

  private

  include ActionView::Helpers::ActiveRecordHelper

  def dialog
    render_to_string :partial=>"dialog"
  end

  def login
    session = UserSession.create(params[:user])
    if session.valid?
      @current_user = session.user # User.find_by_name params[:user][:name]
      render_to_string :partial=>"logged_in_header"
    else
      raise "Invalid login"
    end
  end

  def logout
    UserSession.find.destroy rescue nil
    render_to_string :partial=>"not_logged_in_header"
  end

  def submit
    # Sometimes cross-domain cookie issues can break logging in from the
    # bookmarklet, so we'll save the login info and try to log in again
    if !@current_user
      session = UserSession.create(params[:user])
      if session.valid?
        @current_user = session.user
      else
        raise "Not logged in"
      end
    end

    image = Image.new(params[:image].merge(:user=>@current_user))

    if image.valid?
      image.save
      image.upload_to_s3
      "Uploaded successfully"
    else
      error_messages_for 'image', :object=>image
    end
  rescue
    $!.to_s
  end
end
