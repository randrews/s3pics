// To load this file, use the following bookmarklet:
//
//(function(){var s=document.createElement("script");s.src="http://localhost:3000/javascripts/bookmarklet.js";document.body.appendChild(s)})();

function loadPrototype(){
    if(window.Prototype && window.Prototype.Version >= "1.6.0"){return;}
    var node = document.createElement("script");
    node.src = "http://localhost:3000/javascripts/prototype.js";
    document.body.appendChild(node);
}

loadPrototype();