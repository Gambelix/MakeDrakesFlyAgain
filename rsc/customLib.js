function toPrice(x){
  x = parseFloat(x);
  var digits = 0;
  if(x == Math.round(x)) digits++;
  if(x*10 == Math.round(x*10)) digits++;
  if(digits == 2) x = "" + x + ".00";
  if(digits == 1) x = "" + x + "0";
  return "$"+x;
}

function steamHash(name, warranty){
  //reutrns steam url name from the corresponding Drakelounge item name
  if(name.includes("★ (ST)")){
    name = name.replace("★ (ST)", "").trim();
    name = "★ StatTrak™ " + name;
  }else if(name.includes("(ST)")){
    name = name.replace("(ST)", "").trim();
    name = "StatTrak™ " + name;
  }
    //returns Steam Community Market Link for the entered item
  if(warranty == "Not Painted") warranty = "";
  if(warranty !== ""){
    name += " (" +warranty+ ")";
  }
  return name;
}

function steamHashi(name, warranty){
  name = name.replace("\n", "").trim();
  warranty = warranty.replace("\n", "").trim();
  //returns Steam Community Market Link for the entered item
  if(warranty == "Not Painted") warranty = "";
  if(warranty !== ""){
    name += " " +warranty;
  }
  return name;
}

function linkFromItem(hash){
  return "http://steamcommunity.com/market/listings/730/" + encodeURIComponent(hash);
}

function addCSS(cssID, linkID){
  //from http://stackoverflow.com/questions/574944/how-to-load-up-css-files-using-javascript
  var head  = document.getElementsByTagName('head')[0];
  var link  = document.createElement('link');
  link.id   = cssID;
  link.rel  = 'stylesheet';
  link.type = 'text/css';
  link.href = chrome.extension.getURL(linkID);
  link.media = 'all';
  head.appendChild(link);
}


/*
 * getStyleObject Plugin for jQuery JavaScript Library
 * From: http://upshots.org/?p=112
 */

(function($){
    $.fn.getStyleObject = function(){
        var dom = this.get(0);
        var style;
        var returns = {};
        if(window.getComputedStyle){
            var camelize = function(a,b){
                return b.toUpperCase();
            };
            style = window.getComputedStyle(dom, null);
            for(var i = 0, l = style.length; i < l; i++){
                var prop = style[i];
                var camel = prop.replace(/\-([a-z])/g, camelize);
                var val = style.getPropertyValue(prop);
                returns[camel] = val;
            };
            return returns;
        };
        if(style = dom.currentStyle){
            for(var prop in style){
                returns[prop] = style[prop];
            };
            return returns;
        };
        return this.css();
    }
})(jQuery);

