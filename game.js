var materials = 0;
var money = 0;
var workercount = 0;
var workercost = 5;
var workeradd = 1;
var upgrade = 0;
var autosell = false;
var hasautosell = false;
var shopallowed = false;
var shopcount = 0;
var shopcost = 200;
var exchange = 1;
var canrefine = false;
var refined = 0;
var refinecost = 10;
var objective = 0;
var fadewait = false;
var minecartallowed = false;
var minecartcount = 0;
var minecartcost = 100;
var minecartadd = 10;
var refineryallowed = false;
var refinerycount = 0;
var refinerycost = 100;
var last = 0;
var achievements = [];
var done = [];
var mined = 0;

function update() {
	if (hasautosell) {
		$("#autosell").fadeIn("slow");
		
		if (autosell) {
			document.getElementById("autosell").innerHTML = "Autosell ON";
		} else {
			document.getElementById("autosell").innerHTML = "Autosell OFF";
		}
	} else {
		$("#autosell").hide();
	}
	
	if (Math.round(Math.random()) == 0) {
		exchange += Math.random() / 100000000000;
	} else {
		exchange -= Math.random() / 100000000000;
	}
	
	document.getElementById("exchange").innerHTML = "Exchange rate: 1 material = $" + exchange.toFixed(10);
	
	if (materials == 1) {
		document.getElementById("material-count").innerHTML = "1 material";
	} else {
		document.getElementById("material-count").innerHTML = (Math.floor(materials * 100) / 100) + " materials";
	}
	
	document.getElementById("money-count").innerHTML = "$" + (Math.floor(money * 100) / 100);
	
	document.getElementById("worker-cost").innerHTML = "Costs: $" + workercost;
		
	document.getElementById("refine-cost").innerHTML = "Refinement: Costs " + refinecost + " materials";
	
	if (workercount == 1) {
		$("#worker-count").fadeIn("slow");
		
		document.getElementById("worker-count").innerHTML = "1 worker";
	} else {
		if (workercount != 0) {
			$("#worker-count").fadeIn("slow");
			
			document.getElementById("worker-count").innerHTML = workercount + " workers";
		} else {
			document.getElementById("worker-count").hidden = true;
		}
	}
	
	if (shopallowed) {
		$("#shop-container").fadeIn("slow");
	} else {
		document.getElementById("shop-container").hidden = true;
	}
	
	if (refineryallowed) {
		$("#refinery-container").fadeIn("slow");
	} else {
		document.getElementById("refinery-container").hidden = true;
	}
	
	if (minecartallowed) {
		$("#minecart-container").fadeIn("slow");
	} else {
		document.getElementById("minecart-container").hidden = true;
	}
	
	if (canrefine) {
		$("#refine-container").fadeIn("slow");
	} else {
		document.getElementById("refine-container").hidden = true;
	}
	
	if (refined == 1) {
		$("#refined-count").fadeIn("slow");
		document.getElementById("refined-count").innerHTML = "1 refined material";
	} else {
		if (refined != 0) {
			$("#refined-count").fadeIn("slow");
			document.getElementById("refined-count").innerHTML = refined + " refined materials";
		} else {
			document.getElementById("refined-count").hidden = true;
		}
	}
	
	document.getElementById("shop-cost").innerHTML = "Costs: $" + (shopcost / 2) + " + " + (shopcost / 2) + " materials";
	
	document.getElementById("minecart-cost").innerHTML = "Costs: " + minecartcost + " refined materials";
	
	document.getElementById("refinery-cost").innerHTML = "Costs: " + refinerycost + " refined materials";
	
	if (shopcount == 1) {
		document.getElementById("shop-count").innerHTML = "1 shop";
		$("#shop-count").fadeIn("slow");
	} else {
		if (shopcount != 0) {
			document.getElementById("shop-count").innerHTML = shopcount + " shops";
			$("#shop-count").fadeIn("slow");
		} else {
			document.getElementById("shop-count").hidden = true;
		}
	}
	
	if (refinerycount == 1) {
		document.getElementById("refinery-count").innerHTML = "1 refinery";
		$("#refinery-count").fadeIn("slow");
	} else {
		if (refinerycount != 0) {
			document.getElementById("refinery-count").innerHTML = refinerycount + " refineries";
			$("#refinery-count").fadeIn("slow");
		} else {
			document.getElementById("refinery-count").hidden = true;
		}
	}
	
	if (minecartcount == 1) {
		document.getElementById("minecart-count").innerHTML = "1 minecart";
		$("#minecart-count").fadeIn("slow");
	} else {
		if (minecartcount != 0) {
			document.getElementById("minecart-count").innerHTML = minecartcount + " minecarts";
			$("#minecart").fadeIn("slow");
		} else {
			document.getElementById("minecart-count").hidden = true;
		}
	}
	
	
	if (workeradd == 1) {
		document.getElementById("worker-desc").innerHTML = "Mines 1 material per second";	
	} else {
		document.getElementById("worker-desc").innerHTML = "Mines " + workeradd + " materials per second";
	}
	
	var per = 0;
	
	for (var i = 0; i < workercount; i++) { per += workeradd; }
	for (var i = 0; i < minecartcount; i++) { per += minecartadd / 10; }
	for (var i = 0; i < refinerycount; i++) { per -= 1; }
	
	if (per == 1) {
		document.getElementById("materials-per-second").innerHTML = "1 material per second";
	} else {
		document.getElementById("materials-per-second").innerHTML = per + " materials per second";
	}
	
	
	achievements.forEach(function(achievement) {
		var index = achievements.indexOf(achievement);
		
      	if (!done[index] && achievement.check()) {
			done[index] = true;
			banner(achievement.title, achievement.desc);
      	}
 	});
	
	objectives();
}

function Achievement(title, desc, check){
	this.title = title;	
  	this.desc = desc;
  	this.check = check;
}

function banner(title, desc) {
	document.getElementById("banner-title").innerHTML = "<b>" + title + "</b>";
	document.getElementById("banner-desc").innerHTML = desc;
	
	$("#banner").animate({bottom:'+=100'}, 1000, function(){ setTimeout(function(){ $("#banner").animate({bottom:'-=100'}, 1000); }, 1000); });
}

function objectives() {
	$("#objective-header").attr("style", "text-decoration:underline; margin-left:30%;");
	
	if (objective == 0) {
		document.getElementById("objective").innerHTML = "Get 10 materials";
		document.getElementById("objective-progress").innerHTML = materials + " / 10";
		document.getElementById("objective-reward").innerHTML = "Reward: $50";
		
		var max = ((materials / 10) * 100);
		
		var next = parseFloat(document.getElementById("objective-bar").style.width) + 0.2;
		
		if (next <= max) {
			document.getElementById("objective-bar").style.width = next.toString() + "%";
			}
		
		if (next == 100) {
			objective++;
			money += 50;
			
			$(".objective-container").fadeOut("slow", objectivefade);
			fadewait = true;
		}
	}
	
	if (objective == 1) {
		if (!fadewait) {
			$(".objective-container").fadeIn("slow");
		
			document.getElementById("objective").innerHTML = "Hire 5 workers";
			document.getElementById("objective-progress").innerHTML = workercount + " / 5";
			document.getElementById("objective-reward").innerHTML = "Reward: $100";
			
			var max = ((workercount / 5) * 100);
		
			var next = parseFloat(document.getElementById("objective-bar").style.width) + 0.2;
		
			if (next <= max) {
				document.getElementById("objective-bar").style.width = next.toString() + "%";
			}
		
			if (next == 100) {
				objective++;
				money += 100;
				
				$(".objective-container").fadeOut("slow", objectivefade);
				fadewait = true;
			}
		}
	}
	
	if (objective == 2) {
		if (!fadewait) {
			$(".objective-container").fadeIn("slow");
			
			document.getElementById("objective").innerHTML = "Build 1 shop";
			document.getElementById("objective-progress").innerHTML = shopcount + " / 1";
			document.getElementById("objective-reward").innerHTML = "Reward: 3 workers";
			
			var max = ((shopcount / 1) * 100);
		
			var next = parseFloat(document.getElementById("objective-bar").style.width) + 0.2;
		
			if (next <= max) {
				document.getElementById("objective-bar").style.width = next.toString() + "%";
			}
		
			if (next == 100) {
				objective++;
			
				addworker(); addworker(); addworker();
				
				$(".objective-container").fadeOut("slow", objectivefade);
				fadewait = true;
			}
		}
	}
	
	if (objective == 3) {
		if (!fadewait) {
			$(".objective-container").fadeIn("slow");
			
			document.getElementById("objective").innerHTML = "Get 100 refined materials";
			document.getElementById("objective-progress").innerHTML = refined + " / 100";
			document.getElementById("objective-reward").innerHTML = "Reward: 1 shop";
			
			var max = ((refined / 100) * 100);
		
			var next = parseFloat(document.getElementById("objective-bar").style.width) + 0.2;
		
			if (next <= max) {
				document.getElementById("objective-bar").style.width = next.toString() + "%";
			}
		
			if (next == 100) {
				objective++;
			
				addshop();
				
				$(".objective-container").fadeOut("slow", objectivefade);
				fadewait = true;
			}
		}
	}
	
	if (objective == 4) {
		if (!fadewait) {
			$(".objective-container").fadeIn("slow");
			
			document.getElementById("objective").innerHTML = "Get 5 minecarts";
			document.getElementById("objective-progress").innerHTML = minecartcount + " / 5";
			document.getElementById("objective-reward").innerHTML = "Reward: $5000";
			
			var max = ((minecartcount / 5) * 100);
		
			var next = parseFloat(document.getElementById("objective-bar").style.width) + 0.2;
		
			if (next <= max) {
				document.getElementById("objective-bar").style.width = next.toString() + "%";
			}
		
			if (next == 100) {
				objective++;
			
				money += 5000;
				
				$(".objective-container").fadeOut("slow", objectivefade);
				fadewait = true;
			}
		}
	}
	
	if (objective == 5) {
		if (!fadewait) {
			$(".objective-container").hide();
		}
	}
}

function objectivefade() {
	fadewait = false;
	
	$(".objective-container").css({
    	display: "",
    	opacity: "",
        filter: "",
         zoom: ""
  	});
	
	document.getElementById("objective-bar").style.width = "0%"
}

function reset() {
	localStorage.clear();
	location.reload();	
}

function autoselltoggle() {
	autosell = !autosell;
}

function upgrades() {
	$("#upgrade-header").attr("style", "text-decoration:underline; margin-left:30%;");
	
	if (upgrade == 0) {
		document.getElementById("upgrade-title").innerHTML = "Auto Seller";
		document.getElementById("upgrade-cost").innerHTML = "Costs: $15";
		document.getElementById("upgrade-desc").innerHTML = "Adds a switch to automaticly sell income (toggleable)";
	}
	
	if (upgrade == 1) {
		document.getElementById("upgrade-title").innerHTML = "Hard Hats";
		document.getElementById("upgrade-cost").innerHTML = "Costs: $100";
		document.getElementById("upgrade-desc").innerHTML = "Hard hats for your workers to wear... +1 material per second for workers";
	}
	
	if (upgrade == 2) {
		document.getElementById("upgrade-title").innerHTML = "High-Vis Jackets";
		document.getElementById("upgrade-cost").innerHTML = "Costs: $300";
		document.getElementById("upgrade-desc").innerHTML = "Some high-vis jackets so your workers will be seen... +1 material per second for workers";
	}
	
	if (upgrade == 3) {
		document.getElementById("upgrade-title").innerHTML = "Shops";
		document.getElementById("upgrade-cost").innerHTML = "Costs: $500";
		document.getElementById("upgrade-desc").innerHTML = "Allows you to build shops that increase the conversion rate of materials";
	}
	
	if (upgrade == 4) {
		document.getElementById("upgrade-title").innerHTML = "Dogs";
		document.getElementById("upgrade-cost").innerHTML = "Costs: $1000";
		document.getElementById("upgrade-desc").innerHTML = "Every worker gets a companion dog... +2 materials per second for workers";
	}
	
	if (upgrade == 5) {
		document.getElementById("upgrade-title").innerHTML = "Refining";
		document.getElementById("upgrade-cost").innerHTML = "Costs: $5000";
		document.getElementById("upgrade-desc").innerHTML = "Allows you to refine materials into refined materials, you can use them for things later...";
	}
	
	if (upgrade == 6) {
		document.getElementById("upgrade-title").innerHTML = "Minecarts";
		document.getElementById("upgrade-cost").innerHTML = "Costs: $10000";
		document.getElementById("upgrade-desc").innerHTML = "Allows you to build minecarts";
	}
	
	if (upgrade == 7) {
		document.getElementById("upgrade-title").innerHTML = "Refineries";
		document.getElementById("upgrade-cost").innerHTML = "Costs: $15000";
		document.getElementById("upgrade-desc").innerHTML = "Lets you build refineries that refine materials every second";
	}
	
	if (upgrade == 8) {
		document.getElementsByClassName("upgrade").item(0).hidden = true;	
	}
}

var getHTML = function ( url, callback ) {
	if ( !window.XMLHttpRequest ) return;
	
	var xhr = new XMLHttpRequest();

	xhr.onload = function() {
		if ( callback && typeof( callback ) === 'function' ) {
			callback( this.responseXML );
		}
	}

	xhr.open( 'GET', url );
	xhr.responseType = 'document';
	xhr.send();	
};


function run() {
	load();

	upgrades();
	
	update();
	var interval = setInterval(function(){
		update();
	}, 1);
	
	$("#saved").hide();
	
	var interval2 = setInterval(function(){
		save();
	}, 5000);
	
	handleachievements();
}

function handleachievements() {
	$.getJSON('achievements.json')
   	.done(function (data) {
		for (var i = 0; i < data.length; i++) {
   			var obj = JSON.parse(data[i], function(key, value) {
	  			if (typeof value === "string" && value.startsWith("/Function(") && value.endsWith(")/")) {
    				value = value.substring(10, value.length - 2);
    				return eval("(" + value + ")");
  				}
			
  				return value;
			});
			
			achievements.push(obj);
		}
   	});
   
   	alert(achievements.length);
	
	/*achievements.push(new Achievement(
           "Miner",
           "Mine 100 materials manually", 
           function() {
               return mined >= 100;
           })
     );
	 
	 achievements.push(new Achievement(
           "Millionare",
           "Get 1 million materials", 
           function() {
               return materials >= 1000000;
           })
     );*/
	 
	 if (achievements.length > done.length) {
		for (var i = done.length; i < achievements.length; i++) {
			done.push(false);	
		}
	 }
}

function load() {
	if (localStorage.getItem('materials')) materials = JSON.parse(localStorage.getItem('materials'));
	if (localStorage.getItem('money')) money = JSON.parse(localStorage.getItem('money'));
	if (localStorage.getItem('workercount')) workercount = JSON.parse(localStorage.getItem('workercount'));
	if (localStorage.getItem('workercost')) workercost = JSON.parse(localStorage.getItem('workercost'));
	if (localStorage.getItem('workeradd')) workeradd = JSON.parse(localStorage.getItem('workeradd'));
	if (localStorage.getItem('upgrade')) upgrade = JSON.parse(localStorage.getItem('upgrade'));
	if (localStorage.getItem('autosell')) autosell = JSON.parse(localStorage.getItem('autosell'));
	if (localStorage.getItem('hasautosell')) hasautosell = JSON.parse(localStorage.getItem('hasautosell'));
	if (localStorage.getItem('shopallowed')) shopallowed = JSON.parse(localStorage.getItem('shopallowed'));
	if (localStorage.getItem('shopcount')) shopcount = JSON.parse(localStorage.getItem('shopcount'));
	if (localStorage.getItem('shopcost')) shopcost = JSON.parse(localStorage.getItem('shopcost'));
	if (localStorage.getItem('exchange')) exchange = JSON.parse(localStorage.getItem('exchange'));
	if (localStorage.getItem('refined')) refined = JSON.parse(localStorage.getItem('refined'));
	if (localStorage.getItem('canrefine')) canrefine = JSON.parse(localStorage.getItem('canrefine'));
	if (localStorage.getItem('refinecost')) refinecost = JSON.parse(localStorage.getItem('refinecost'));
	if (localStorage.getItem('objective')) objective = JSON.parse(localStorage.getItem('objective'));
	if (localStorage.getItem('minecartallowed')) minecartallowed = JSON.parse(localStorage.getItem('minecartallowed'));
	if (localStorage.getItem('minecartcount')) minecartcount = JSON.parse(localStorage.getItem('minecartcount'));
	if (localStorage.getItem('minecartcost')) minecartcost = JSON.parse(localStorage.getItem('minecartcost'));
	if (localStorage.getItem('refineryallowed')) refineryallowed = JSON.parse(localStorage.getItem('refineryallowed'));
	if (localStorage.getItem('refinerycount')) refinerycount = JSON.parse(localStorage.getItem('refinerycount'));
	if (localStorage.getItem('refinerycost')) refinerycost = JSON.parse(localStorage.getItem('refinerycost'));
	if (localStorage.getItem('mined')) mined = JSON.parse(localStorage.getItem('mined'));
	if (localStorage.getItem('done')) done = JSON.parse(localStorage.getItem('done'));
	
	for (var i = 0; i < workercount; i++) {
		var interval = setInterval(function(){
			materials += workeradd;
			
			if (autosell) { sell(workeradd); }
		}, 1000);
	}
	
	for (var i = 0; i < minecartcount; i++) {
		var interval = setInterval(function(){
			materials += minecartadd;
			
			if (autosell) { sell(minecartadd); }
		}, 10000);
	}
	
	for (var i = 0; i < refinerycount; i++) {
		var interval = setInterval(function(){
			refine();
		}, 1000);
	}
}

function save() {
	localStorage.setItem('materials', JSON.stringify(materials));
	localStorage.setItem('money', JSON.stringify(money));
	localStorage.setItem('workercount', JSON.stringify(workercount));
	localStorage.setItem('workercost', JSON.stringify(workercost));
	localStorage.setItem('workeradd', JSON.stringify(workeradd));
	localStorage.setItem('upgrade', JSON.stringify(upgrade));
	localStorage.setItem('autosell', JSON.stringify(autosell));
	localStorage.setItem('hasautosell', JSON.stringify(hasautosell));
	localStorage.setItem('shopallowed', JSON.stringify(shopallowed));
	localStorage.setItem('shopcount', JSON.stringify(shopcount));
	localStorage.setItem('shopcost', JSON.stringify(shopcost));
	localStorage.setItem('exchange', JSON.stringify(exchange));
	localStorage.setItem('refined', JSON.stringify(refined));
	localStorage.setItem('canrefine', JSON.stringify(canrefine));
	localStorage.setItem('refinecost', JSON.stringify(refinecost));
	localStorage.setItem('objective', JSON.stringify(objective));
	localStorage.setItem('minecartallowed', JSON.stringify(minecartallowed));
	localStorage.setItem('minecartcount', JSON.stringify(minecartcount));
	localStorage.setItem('minecartcost', JSON.stringify(minecartcost));
	localStorage.setItem('refineryallowed', JSON.stringify(refineryallowed));
	localStorage.setItem('refinerycount', JSON.stringify(refinerycount));
	localStorage.setItem('refinerycost', JSON.stringify(refinerycost));
	localStorage.setItem('mined', JSON.stringify(mined));
	localStorage.setItem('done', JSON.stringify(done));
	
	$("#saved").fadeIn("slow", function(){ setTimeout(function(){ $("#saved").fadeOut("slow");}, 500); });
}

function mine() {
	materials++;
	mined++;
}


function sell(amount) {
	if (materials >= amount) {
		materials -= amount;
		money += amount * exchange;
	}
}

function buy(amount) {
    if (money >= amount * exchange) {
        money -= amount * exchange;
        materials += amount;
    }
}

function sellone() {
	sell(1);
}

function sellten() {
	sell(10);
}

function sellhundred() {
	sell(100);	
}

function sellall() {
	sell(materials);
}

function buyone() {
	buy(1);
}

function buyten() {
	buy(10);
}

function buyhundred() {
	buy(100);	
}

function buyall() {
	buy(money);
}

function refine() {
	if (materials >= refinecost) {
		materials -= refinecost;
		refined++;	
	}
}

function worker() {
	if (money >= workercost) {
		money -= workercost;
		
		addworker();
	}
}

function addworker() {
	workercost *= 1.3;
	workercost = workercost.toFixed(0);
	
	workercount++;
		
	var interval = setInterval(function(){
		materials += workeradd;
		
		if (autosell) { sell(workeradd); }
	}, 1000);
}

function shop() {
	if (money >= (shopcost / 2) && materials >= (shopcost / 2)) {
		money -= (shopcost / 2);
		materials -= (shopcost / 2);
		
		addshop();
	}
}

function addshop() {
	shopcost += 200;
			
	shopcount++;
	
	exchange += 0.1;
}

function refinery() {
	if (refined >= refinerycost) {
		refined -= refinerycost;
		
		addrefinery();	
	}
}

function addrefinery() {
	refinerycount++;
	
	refinerycost *= 1.3;
	refinerycost = refinerycost.toFixed();
	
	var interval = setInterval(function(){
		refine();
	}, 1000);
}

function minecart() {
	if (refined >= minecartcost) {
		refined -= minecartcost;
		
		addminecart();	
	}
}

function addminecart() {
	minecartcount++;
	
	minecartcost *= 1.3;
	minecartcost = minecartcost.toFixed();
	
	var interval = setInterval(function(){
		materials += minecartadd;
		
		if (autosell) { sell(minecartadd); }
	}, 10000);
}

function buyupgrade() {
	var enough = false;
	
	if (upgrade == 0) {
		if (money >= 15) {
			money -= 15;
			
			hasautosell = true;
			
			enough = true;
		}
	}
	
	if (upgrade == 1) {
		if (money >= 100) {
			money -= 100;
			
			workeradd++;
			
			enough = true;
		}
	}
	
	if (upgrade == 2) {
		if (money >= 300) {
			money -= 300;
			
			workeradd++;
			
			enough = true;
		}
	}
	
	if (upgrade == 3) {
		if (money >= 500) {
			money -= 500;
			
			shopallowed = true;
			
			enough = true;
		}
	}
	
	if (upgrade == 4) {
		if (money >= 1000) {
			money -= 1000;
			
			workeradd += 2;
			
			enough = true;
		}
	}
	
	if (upgrade == 5) {
		if (money >= 5000) {
			money -= 5000;
			
			canrefine = true;
			
			enough = true;
		}
	}
	
	if (upgrade == 6) {
		if (money >= 10000) {
			money -= 10000;
			
			minecartallowed = true;
			
			enough = true;	
		}
	}
	
	if (upgrade == 7) {
		if (money >= 15000) {
			money -= 15000;
			
			refineryallowed = true;
			
			enough = true;	
		}
	}
	
	if (enough) {
		upgrade++;
		
		$(".upgrade").fadeOut("slow", upgradefade);
	}
}

function upgradefade() {
	$(".upgrade").css({
    	display: "",
    	opacity: "",
        filter: "",
         zoom: ""
  	});
	
	upgrades();
	
	if (!document.getElementsByClassName("upgrade").item(0).hidden) { $(".upgrade").fadeIn("slow"); }
}