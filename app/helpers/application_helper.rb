# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def bookmarklet_code
    js = <<-JS
     javascript:(
       function(){
         var s=document.createElement("script");
         s.src="http://#{request.host_with_port}#{javascript_path('bookmarklet')}";
         document.body.appendChild(s);
       })();
    JS

    @@bookmarklet_code ||= js.squish
  end
end
