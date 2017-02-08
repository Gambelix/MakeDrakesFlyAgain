var elementCounter = 0;

var dotintervall = null;
var loadspan = null;
var content = null;

function first(){
  jQuery(document).ready(function($){
    //create an overlay while the content of the site is still changing
    //find the part the overlay should overlay
    var divs = $("div");
    for(var i = 0; i < divs.length; i++){
      if($(divs[i]).attr('class')=="pagination"){
        content = divs[i];
      }
    }
    $(content).css("visibility", "hidden");
  });
  loadfunction();
}

if(window.location.href.includes('drakelounge')){
		//code for drakelounge
		if(window.location.href.includes('user')){
			//code for drakelounge history
			//wait to load
			//console.log('loaded');
			var loaded = true;
    	var loadIntervali = setInterval(function(){
    	 // console.log('loaded2');
    		loaded = false;
    		jQuery(document).ready(function($){
    		 // console.log('false');
    			var divs = $("div");
    			for(var i = 0; i < divs.length; i++){
    				if($(divs[i]).attr('class')=="content" && $($(divs[i]).children()[0]).attr('class')=="content-box user-box"){
    					loaded = true;
    					//console.log('true;');
    				}
    			}
      		if(loaded){
      			clearInterval(loadIntervali);
      			first();
      		}
    		});
    	}, 50);
		}
}

function loadfunction(){
  var loaded = false;
	var loadInterval = setInterval(function(){
		loaded = true;
		jQuery(document).ready(function($){
			var divs = $("div");
			for(var i = 0; i < divs.length; i++){
				if($(divs[i]).attr('class')=="loader"){
					loaded = false;
				}
			}
		});
		if(loaded){
			clearInterval(loadInterval);
			setTimeout(function(){main(); }, 200);
		}
	}, 500);
}


function main(){
	//main code that should be executed after load
	function round(x){
		//rounds to 2 digits
		return Math.round(x * 100) / 100 ;
	}

	function toCurrency(n){
		//formats any number up to 2 digits into the form drakelounge shows money sums
		var nLessZero = null;
		if(n < 0){
			nLessZero = true;
		}else{
			nLessZero = false;
		}
		n = Math.abs(n);
		var decimals = 0;
		if(Math.round(n) == n) decimals++;
		if(Math.round(n*10) == n*10) decimals++;
		{
		//this part is from http://stackoverflow.com/users/1249581/vision
			n.toFixed(2).replace(/./g, function(c, i, a) {
				return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
			});
		}
		var str = "";
		if(nLessZero){
			str += "-$" + n;
		}else{
			str += "+$" + n;
		}
		if(decimals == 1) str += "0";
		if(decimals == 2) str += ".00";
		return str;
	}

	jQuery(document).ready(function($){
			
			
			//start fixing the page format
			var totalBetted = 0;
			var profit = 0;
			var totalWon = 0;
			var totalLost = 0;
			
			function fixPage(){
			  //corrects outcomes on the page and add them to the vars defined above
  			var rows = $($(document.getElementById('history')).children()[0]).children(); //puts all rows of the history in an array
  			
  			for(var i = 0; i < rows.length; i++){ if($(rows[i]).attr('class')=="row"){ //for each row do
  				var rowContent = $(rows[i]).children(); //puts the content of the row in an array
  				var percentage = parseFloat(rowContent[1].innerHTML);
  				var amount = parseFloat(rowContent[2].innerHTML.trim().substring(1, rowContent[2].innerHTML.length)); //fetches amount listed in the row
  				totalBetted += amount; //adds fetched amount to the total amount of betted wagers
  				var outcomeElement = $(rowContent[3]).children()[0]; //fetches the DOM Element where the outcome is listed
  				var outcome = parseFloat(outcomeElement.innerHTML.trim().replace('$', '')); //fetches the outcome amount
  				
  				//calculate the real outcome and write it into the appropriate place
  				var righOutcome = outcome;
  				if(righOutcome > 0) righOutcome = (percentage*amount)-amount;
  				righOutcome = round(righOutcome);
  				if(!isNaN(righOutcome)){
  					profit += righOutcome;
  					//outcomeElement.innerHTML=toCurrency(righOutcome);
  					//console.log($(outcomeElement));
  					//$(outcomeElement).attr('id', 'outcomeElement'+elementCounter);
  					//$('#outcomeElement'+elementCounter).text(toCurrency(righOutcome));
  					//$(outcomeElement).text(toCurrency(righOutcome));
  					//console.log(outcomeElement);
  					//document.getElementById('outcomeElement'+elementCounter).innerHTML=righOutcome;
  					elementCounter++;
  					if(righOutcome < 0){
  						totalLost += righOutcome;
  					}else{
  						totalWon += righOutcome;
  					}
  				}
  			}}
			}
			
			//go through all history pages to fix every page
			//fetch history page buttons
			var pagelist = null;
  		var divs = $("div");
  		for(var i = 0; i < divs.length; i++){
  		  if($(divs[i]).attr('class')=="pagination"){
  		    pagelist = $($(divs[i]).children()[0]).children();
  		  }
  		}
  		var firstpage = ($(pagelist).children()[1]);
  		var lastpage = ($(pagelist).children()[$(pagelist).children().length-2]);
  		var nextpage = ($(pagelist).children()[$(pagelist).children().length-1]);
  		var i = 1;
  		var currentpage = ($(pagelist).children()[i]);
      //repeat the page fix
      function waitForLoad(){
        var loaded = true;
        var divs = $("div");
      	for(var i = 0; i < divs.length; i++){
      		if($(divs[i]).attr('class')=="loader"){
      			loaded = false;
      		}
      	}
        if(loaded){
          window.setTimeout(waitForLoad, 50);
        }else{
          waitForLoadi();
        }
      }
      
      function waitForLoadi(){
        var loaded = true;
        var divs = $("div");
      	for(var i = 0; i < divs.length; i++){
      		if($(divs[i]).attr('class')=="loader"){
      			loaded = false;
      		}
      	}
        if(!loaded){
          window.setTimeout(waitForLoadi, 50);
        }else{
          fixPage();
          //console.log('fixed');
          if($(nextpage).parent().attr('class')!="inactive"){
            loadi();
          }else{
            correctTotal();
          }
        }
      }
      
      function loadi(){
        nextpage.click();
        i++;
        currentpage = ($(pagelist).children()[i]);
        waitForLoad();
      }
      fixPage();
      if(nextpage != null){
        loadi();
      }else{
        correctTotal();
      }
      
			
			//correct Total Wins and Total Losses
			function correctTotal(){
  			divs = ($ ("div"));
  			for(var i = 0; i < divs.length; i++){
  				if(($ (divs[i])).attr('class')=="content-box user-box"){
  					var el = $(divs[i]).children();
  					var spans = [];
  					for(var j = 0; j < el.length; j++){
  						if($(el[j]).is("span")) spans[spans.length] = el[j];
  					}
    				if(spans[0].innerHTML.includes('Account linked')){
    					$(spans[1]).children()[1].innerHTML = toCurrency(round(totalWon));
    					$(spans[2]).children()[1].innerHTML = toCurrency(round(totalLost));
  					}else{
  					  $(spans[0]).children()[1].innerHTML = toCurrency(round(totalWon));
    					$(spans[1]).children()[1].innerHTML = toCurrency(round(totalLost));
  					}
  					if(profit < 0){
  						var profitString = '<span>Profit: <strong class="light-red">'+toCurrency(round(profit))+"</strong></span><br>";
  					}else{
  						var profitString = '<span>Profit: <strong class="light-green">'+toCurrency(round(profit))+"</strong></span><br>";
  					}
  					var totalBetString = "<span>Total Betted: <strong>"+toCurrency(round(totalBetted)).substr(1)+"</strong></span>";
  					if(spans[0].innerHTML.includes('Account linked')){
    					$(totalBetString).insertAfter(spans[3]);
    					$(profitString).insertAfter(spans[2]);
  					}else{
  					  $(totalBetString).insertAfter(spans[2]);
    					$(profitString).insertAfter(spans[1]);
  					}
  				}
  			}
  			if(firstpage != undefined){
  			  firstpage.click();
  			  $(content).css("visibility", "visible");
  			}
			}
		});
}