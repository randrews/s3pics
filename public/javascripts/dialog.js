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
				    "<div class='selectable-image'><div class='selectable-overlay' for='"+src+"' onclick='randrews_lookingat.selectImage(this)'/><img src=\""+
				    src+"\"/><div class='image-name'> "+sizes.get(src).size_str+"</div>";
				  var row = new Element("div",{"class":"image-row"}).update(html);
				  selector.appendChild(row);
				});
    var first = $$("#randrews-lookingat .image-selector .selectable-overlay")[0];
    if(first){
      randrews_lookingat.selectImage(first);
    }

    $$("#randrews-lookingat #image_comment")[0].value = document.title;
  },

  getAllImages: function(){
    var sizes = $H();
    $$("img").each(function(img){
		     var src = img.getAttribute("src");
		     if(!src){ return; }
		     sizes.set(src, {size: img.width * img.height, size_str:""+img.width+"x"+img.height});
    });

    return sizes;
  },

  selectImage: function(overlay){
    var oldSelected = $$("#randrews-lookingat .image-selector .selectable-overlay.selected")[0];
    if(oldSelected){
      oldSelected.removeClassName("selected");
    }
    overlay.addClassName("selected");
    $$("#randrews-lookingat #image_url")[0].value = randrews_lookingat.qualifyURL(overlay.getAttribute("for"));
  },

  qualifyURL: function(url) {
    var a = document.createElement('a');
    a.href = url;
    return a.href;
  },

  submitImage: function(){
    var params={
      "private": $F($$("#randrews-lookingat #image_private")[0]),
      url: $F($$("#randrews-lookingat #image_url")[0]),
      comment: $F($$("#randrews-lookingat #image_comment")[0])
    };

    $("randrews_submit_status").update("<div class='loading'/>");
    crossReplace("randrews_submit_status","submit",params);
  }
};

randrews_lookingat.populateImages();