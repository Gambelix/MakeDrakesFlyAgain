if(window.location.href.includes('drakewing')){
	//code for drakelounge
	if(window.location.href.includes('shop') || window.location.href.includes('deposit')){
		//code for drakelounge shop
		chrome.runtime.sendMessage({get: "priceList"}, function(response) {
    var priceList = response.data;
    var currentloaded = [];
		jQuery(document).ready(function($){
		  var pages = $($("#pagination-wrapper").children()[0]).children();
      var currentpage = function(){
                          for(var i = 0; i < pages.length; i++){
                            if($(pages[i]).attr('class') == "active"){
                              return pages[i];
                            }
                          }
                        }();
                            
      var old = currentpage;
      var neu = currentpage;
      addCSS('CE', 'drakewing/shop/wingshop.css');
		  (function load(){
  		  var loaded = true;
  		  var loaded2 = false;
  		  var divs = $("div");
  			for(var i = 0; i < divs.length; i++){
  				if($(divs[i]).attr('class')=="loader"){
  					loaded = false;
  				}
  				if($(divs[i]).attr('class') == "items-wrapper display-flex flex-wrap"){
  				  loaded2 = true;
  				}
			  }
			  if(!loaded || !loaded2){
			    setTimeout(load, 100);
			  }else{
          var divs = $("div");
          var shopItems =  function(){
                              for(var i = 0; i<divs.length; i++){
                                if($(divs[i]).attr('class') == "items-wrapper display-flex flex-wrap"){
                                  return $(divs[i]).children();
                                }
                              }
                            }();
          for(var i = 0; i<shopItems.length; i++){
            if($(shopItems[i]).attr('class').includes("single-item border flex-1 margin-all-10")){
              var textholder = $(shopItems[i]).children()[2];
              var itemName = "";
              var warranty = "";
              if($(textholder).children().length > 1){
                warranty =  $(textholder).children()[1].innerHTML;
                itemName =  $(textholder).children()[0].innerHTML;
              }else{
                itemName =  $(textholder).children()[0].innerHTML;
              }
              var hash = steamHashi(itemName, warranty);
              var price = priceList[hash];
              var link = linkFromItem(hash);
              if(price === undefined){
                price = "no listing";
              }else{
                price = toPrice(price);
              }
              $(shopItems[i]).wrap("<div class='itemWrapCE'></div>");
              $('<a target="_blank" href="'+link+'"><div class="itemPriceCE"><span class="spanCE"><i class="icon-steam"></i>  '+ price +'</span></div></a>').insertAfter(shopItems[i]);
              $(shopItems[i]).css("margin-bottom" , "20px");
              $($($(shopItems[i]).children()[2]).children()[0]).css("max-width", "20px");
              $(shopItems[i]).css("display", "flex");
              $(shopItems[i]).css("height" , "130px");
              //$(shopItems[i]).attr('class', $(shopItems[i]).attr('class').replace("flex-1 ", ""));
              $($($(shopItems[i]).children()[2]).children()[0]).css("flex-grow", 2);
              //$($($(shopItems[i]).children()[2]).children()[0]).css("width", "100%");
              $($(shopItems[i]).children()[2]).children()[0].style.display="none";
              currentloaded[currentloaded.length] = $(shopItems[i]).parent();
            }
          }
          setTimeout(function(){for(var i = 0; i<shopItems.length; i++){
            if($(shopItems[i]).attr('class').includes("single-item border flex-1 margin-all-10")){
             
             $($(shopItems[i]).children()[2]).children()[0].style.display="inline";
            }
          }}, 500);
          
          
          var pagechange = setInterval(function(){
            var pages = $($("#pagination-wrapper").children()[0]).children();
            var currentpage = function(){
                                for(var i = 0; i < pages.length; i++){
                                  if($(pages[i]).attr('class') == "active"){
                                    return pages[i];
                                  }
                                }
                              }();
            old = neu;
            neu = currentpage;
            var loading = false;
            var divs = $("div");
            for(var i = 0; i < divs.length; i++){
              if($(divs[i]).attr('class')=='loader') loading = true;
            }
            if((currentpage !== null && old !== neu)|| loading){
              clearInterval(pagechange);
              for(var i = 0; i<currentloaded.length; i++){
                $(".itemPriceCE").parent().remove();
                currentloaded[i].contents().unwrap();
                currentloaded[i].remove();
              }
              load();
            }
          }, 100);
              
         }
		  })();
		});
	});
	}
}
