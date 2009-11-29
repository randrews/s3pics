# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def bookmarklet_code
    js = <<-JS
     javascript:(
       function(){
         var s=document.createElement("script");
         s.src="http://#{request.host_with_port}#{landing_path}";
         document.body.appendChild(s);
       })();
    JS

    @@bookmarklet_code ||= js.squish
  end

  def embed_javascript_include_tag name
    javascript_include_tag "http://#{request.host_with_port}#{javascript_path(name)}"
  end
end
