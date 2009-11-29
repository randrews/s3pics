class EmbedController < ApplicationController
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
    content = self.send params[:method]
    render :update do |page|
      page.replace_html params[:update], content
    end
  end

  private

  def dialog
    render_to_string :partial=>'dialog'
  end
end
