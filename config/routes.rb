ActionController::Routing::Routes.draw do |map|
  map.login "/login", :controller=>:user, :action=>:login
  map.logout "/logout", :controller=>:user, :action=>:logout
  map.logout "/account", :controller=>:user, :action=>:account

  map.root :controller=>:home, :action=>:index

  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end
