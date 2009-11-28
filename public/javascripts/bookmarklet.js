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

  var holder = document.createElement("div");
  var gray = document.createElement("div");
  var dialog = document.createElement("div");

  holder.writeAttribute("id", "randrews-lookingat");
  gray.addClassName("gray");
  dialog.addClassName("dialog");

  holder.appendChild(gray);
  holder.appendChild(dialog);
  document.body.appendChild(holder);
}

function shortCreate(){
  if(window["lookingat-loaded"]){return;}

  var holder = new Element("div",{id:"randrews-lookingat"}).update("<div class='gray'/><div class='dialog'/>");

  document.body.appendChild(holder);
}

function domCreate(){
  if(window["lookingat-loaded"]){return;}

  var holder = document.createElement("div");
  var gray = document.createElement("div");
  var dialog = document.createElement("div");

  holder.setAttribute("id", "randrews-lookingat");
  gray.setAttribute("class","gray");
  dialog.setAttribute("class","dialog");

  holder.appendChild(gray);
  holder.appendChild(dialog);
  document.body.appendChild(holder);
}

withPrototype(function(){
  loadStylesheets();
  shortCreate();

  window["lookingat-loaded"] = true;
});
