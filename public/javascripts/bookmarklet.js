// To load this file, use the following bookmarklet:

function withPrototype(after){
  if(window.Prototype && window.Prototype.Version >= "1.6.0"){after();return;}
  var node = document.createElement("script");
  node.src = "http://localhost:3000/javascripts/prototype.js";
  document.body.appendChild(node);

  var waitForProto = function(){
    if(window.Prototype){
      after();
    }else{
      window.setTimeout(waitForProto,0);
    }
  };

  waitForProto();
}

function loadStylesheets(){
  if(window["lookingat-loaded"]){return;}

  var node = document.createElement("link");
  node.rel="stylesheet";
  node.href = "http://localhost:3000/stylesheets/reset.css";
  document.body.appendChild(node);

  var node2 = document.createElement("link");
  node2.rel="stylesheet";
  node2.href = "http://localhost:3000/stylesheets/bookmarklet.css";
  document.body.appendChild(node2);
}

function createDialog(){
  if(window["lookingat-loaded"]){return;}

  var holder = new Element("div",{id:"randrews-lookingat"}).update("<div class='gray'></div><div class='dialog'><div class='relative' id='randrews-lookingat-dialog'><div class='loading'/></div></div>");

  document.body.appendChild(holder);
}

function fillDialog(){
  crossReplace("randrews-lookingat-dialog",
	       "dialog");
}

function crossReplace(update, action, params){
    var node = document.createElement("script");
    node.src = "http://localhost:3000/embed/"+action+"/"+update+"?"+$H(params).toQueryString();
    document.body.appendChild(node);
}

withPrototype(function(){
  loadStylesheets();
  createDialog();
  fillDialog();

  window["lookingat-loaded"] = true;
});
