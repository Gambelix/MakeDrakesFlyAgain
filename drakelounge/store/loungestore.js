if(window.location.href.includes('drakelounge')){
	//code for drakelounge
	if(window.location.href.includes('store')){
		//code for drakelounge store
		chrome.runtime.sendMessage({get: "priceList"}, function(response) {
      var priceList = response.data;
		
		jQuery(document).ready(function($){
      
	    var currentloaded = [];
	    var currentpage = null;
			addCSS('CE', 'drakelounge/store/loungestore.css');
		  (function load(){
  		  var loaded = true;
  		  var divs = $("div");
  			for(var i = 0; i < divs.length; i++){
  				if($(divs[i]).attr('class')=="loader"){
  					loaded = false;
  				}
			  }
			  if(!loaded){
			    setTimeout(load, 100);
			  }else{
			    var divs = $("div");
          var storeItems =  function(){
                              for(var i = 0; i<divs.length; i++){
                                if($(divs[i]).attr('class') == "store-items"){
                                  return $(divs[i]).children();
                                }
                              }
                            }();
          for(var i = 0; i<storeItems.length; i++){
            if($(storeItems[i]).attr('class').includes("store-item border corner-left corner-right")){
              var warranty =  function(){
                                var name = "";
                                var firstline = $(storeItems[i]).children()[0];
                                if($(firstline).attr('class')=="color-icon-grey"){
                                  name = firstline.innerHTML;
                                }
                                return name;
                              }();
              var itemName =  function(){
                                var name = "";
                                var firstline = $(storeItems[i]).children()[0];
                                if($(firstline).attr('class')!="color-icon-grey"){
                                 name = $(firstline).children()[0].innerHTML;
                                }else{
                                  name = $($(storeItems[i]).children()[1]).children()[0].innerHTML;
                                }
                                return name;
                              }();
              var price = "can't find";
              if(!itemName.includes("Sticker")){
                var hash = steamHash(itemName, warranty);
                var link = linkFromItem(hash);
                price = priceList[hash];
              }
              if(price === undefined){
                price = "no listing";
              }else if(price != "can't find"){
                price = toPrice(price);
              }
              $(storeItems[i]).wrap("<div class='itemWrapCE'></div>");
              currentloaded[currentloaded.length] = $(storeItems[i]).parent();
              $('<a target="_blank" href="'+link+'"><div class="itemPriceCE"><span class="spanCE"><i class="icon-steam"></i>  '+ price +'</span></div></a>').insertAfter(storeItems[i]);
            }
          }
          divs = $("div");
          currentpage =  function(){
                              for(var i = 0; i<divs.length; i++){
                                if($(divs[i]).attr('class') == "pagination"){
                                  var pages = $($(divs[i]).children()[0]).children();
                                  for(var j = 0; j < pages.length; j++){
                                    if($(pages[j]).attr('class')=="active"){
                                      return pages[j];
                                    }
                                  }
                                }
                              }
                              return null;
                            }();
                            
          var pagechange = setInterval(function(){
            var loading = false;
            var divs = $("div");
            for(var i = 0; i < divs.length; i++){
              if($(divs[i]).attr('class')=='loader') loading = true;
            }
            if((currentpage != null && $(currentpage).attr('class') != "active")|| loading){
              clearInterval(pagechange);
              for(var i = 0; i<currentloaded.length; i++){
                $(".itemPriceCE").parent().remove();
                currentloaded[i].contents().unwrap();
                currentloaded[i].remove();
              }
              load();
            }
          }, 500);
			    
			  }
		  })();
		});
	
	});
	}
}
