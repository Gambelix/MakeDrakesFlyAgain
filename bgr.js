jQuery(document).ready(function($){
  
  $.ajax({
  url: "https://api2.ncla.me/api/items/all/730,570/compact",
     success: function( response ) {
        chrome.runtime.onMessage.addListener(
          function(request, sender, sendResponse) {
            if (request.get == "priceList")
              sendResponse({data: response.data[730]});
          });
     }
  });
  
  
});