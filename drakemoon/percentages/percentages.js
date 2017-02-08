if(window.location.href.includes('drakemoon')){
		//code for drakemoon
		if(document.getElementById('winning-numbers') !== null){
  		jQuery(document).ready(function($){
    		var revOverlay = $(document.getElementById('winning-numbers')).parent();
    		
    		// select the target node
        var target = revOverlay[0];
         
        // create an observer instance
        var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if(revOverlay.css('display')=='block'){
              function load(){
                if($($("#winning-numbers").children()[2]).attr('class')=="loader"){
                  setTimeout(load, 200);
                }else{
                  addPercentages();
                }
              }
              load();
            }
          });
        });
         
        // configuration of the observer:
        var config = { attributes: true, childList: true, characterData: true };
         
        // pass in the target node, as well as the observer options
        observer.observe(target, config);
        
        function addPercentages(){
          observer.disconnect();
          var winNumb = document.getElementById('winning-numbers');
      		var table = $(winNumb).children()[2];
      		var rows = $($(table).children()[1]).children();
      		function toPer(val){
      		  var digits = 0;
      		  if(val*10 != Math.round(val*10))digits++;
      		  if(val != Math.round(val))digits++;
      		  val = val.toString();
      		  if(digits === 0) val += ".00";
      		  if(digits === 1) val += "0";
      		  val += "%";
      		  return val;
      		}
      	  for(var i = 0; i < rows.length; i++){
      	    var textItem = $($(rows[i]).children()[1]).children()[0];
      	    var evaluation = toPer(Math.round(Math.abs(math.eval(textItem.innerHTML))/7*1000)/100000);
      	    if(evaluation.length<7){
      	      textItem.innerHTML += " = " + evaluation;
      	    }else{
      	      textItem.innerHTML += " ≈ " + evaluation;
      	    }
      	  }
        }
        
  		});
		}
}
