randrews_lookingat = {
  showLoginForm: function(){
    $$("#randrews-lookingat .header .login")[0].hide();
    $$("#randrews-lookingat .header .login-form")[0].show();
  },

  login: function(){
    var params = {
      "user[name]": $F($$("#randrews-lookingat .header input#user_name")[0]),
      "user[password]": $F($$("#randrews-lookingat .header input#user_password")[0])
    };
    crossReplace("randrews-lookingat-header","login",params);
  },

  logout: function(){
    crossReplace("randrews-lookingat-header","logout");
  }
};
