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
  },

  closeDialog: function(){
    $("randrews-lookingat").hide();
  },

  populateImages: function(){
    var sizes = randrews_lookingat.getAllImages();
    var cmp = function(a,b){ return sizes.get(b).size - sizes.get(a).size; };
    var selector = $$("#randrews-lookingat .image-selector")[0];
    sizes.keys().sort(cmp).each(function(src){
				  var html =
				    "<div class='selectable-image'><img src=\""+
				    src+"\"/><div class='image-name'> "+sizes.get(src).size_str+"</div>";
				  var row = new Element("div",{"class":"image-row"}).update(html);
				  selector.appendChild(row);
				});
  },

  getAllImages: function(){
    var sizes = $H();
    $$("img").each(function(img){
		     var src = img.getAttribute("src");
		     if(!src){ return; }
		     sizes.set(src, {size: img.width * img.height, size_str:""+img.width+"x"+img.height});
    });

    return sizes;
  }
};

randrews_lookingat.populateImages();