ActionController::Routing::Routes.draw do |map|
  map.login "/login", :controller=>:user, :action=>:login
  map.logout "/logout", :controller=>:user, :action=>:logout
  map.account "/account", :controller=>:user, :action=>:account

  map.embed "/embed/:method/:update", :controller=>:embed, :action=>:index
  map.landing "/landing", :controller=>:embed, :action=>:landing

  map.root :controller=>:home, :action=>:index

  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end
