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
	
	if (autosell) sell(materials);
	
	if (Math.round(Math.random()) == 0) {
		exchange += Math.random() / 100000000000;
	} else {
		exchange -= Math.random() / 100000000000;
	}
	
	document.getElementById("exchange").innerHTML = "Exchange rate: 1 material = $" + exchange.toFixed(10);
	
	if (materials == 1) {
		document.getElementById("material-count").innerHTML = "1 material";
	} else {
		document.getElementById("material-count").innerHTML = materials + " materials";
	}
	
	document.getElementById("money-count").innerHTML = "$" + money.toFixed(2);
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
	
	document.getElementById("shop-cost").innerHTML = "$" + (shopcost / 2) + " " + (shopcost / 2) + " materials";
	
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
	
	if (workeradd == 1) {
		document.getElementById("worker-desc").innerHTML = "Mines 1 material per second";	
	} else {
		document.getElementById("worker-desc").innerHTML = "Mines " + workeradd + " materials per second";
	}
	
	objectives();
	
	setUpgradeText();
}

function objectives() {
	$("#objective-header").attr("style", "text-decoration:underline; margin-left:30%;");
	
	if (objective == 0) {
		document.getElementById("objective").innerHTML = "Get 10 materials";
		document.getElementById("objective-progress").innerHTML = materials + " / 10";
		document.getElementById("objective-reward").innerHTML = "Reward: $50";
		
		var max = ((materials / 10) * 100);
		
		var next = parseFloat(document.getElementById("objective-bar").style.width) + 0.1;
		
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
		
			var next = parseFloat(document.getElementById("objective-bar").style.width) + 0.1;
		
			if (next <= max) {
				document.getElementById("objective-bar").style.width = next.toString() + "%";
			}
		
			if (next == 100) {
				objective++;
				money += 100;
				
				$(".objective-container").fadeOut("slow");
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
		
			var next = parseFloat(document.getElementById("objective-bar").style.width) + 0.1;
		
			if (next <= max) {
				document.getElementById("objective-bar").style.width = next.toString() + "%";
			}
		
			if (next == 100) {
				objective++;
			
				addworker(); addworker(); addworker();
				
				$(".objective-container").fadeOut("slow");
				fadewait = true;
			}
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

function setUpgradeText() {
	if (upgrade == 0) {
		document.getElementById("upgrade-title").innerHTML = "Auto Seller";
		document.getElementById("upgrade-cost").innerHTML = "Costs: $15";
		document.getElementById("upgrade-desc").innerHTML = "Adds a switch to automaticly sell materials (toggleable)";
	}
	
	if (upgrade == 1) {
		document.getElementById("upgrade-title").innerHTML = "Hard hats";
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
		//not added yet
		//make upgrade panel disappear
		document.getElementsByClassName("upgrade").item(0).hidden = true;	
	}
}

function run() {
	load();
	
	update();
	var interval = setInterval(function(){
		update();
	}, 1);
	
	$("#saved").hide();
	
	for (var i = 0; i < workercount; i++) {
		var interval = setInterval(function(){
			materials += workeradd;
		}, 1000);
	}
	
	var interval2 = setInterval(function(){
		save();
	}, 5000);
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


	$("#saved").fadeIn("slow", function(){ setTimeout(function(){ $("#saved").fadeOut("slow");}, 500); });
}

function mine() {
	materials++;	
}

function sell(amount) {
	money += amount * exchange;
	materials -= amount;
}

function sellall() {
	sell(materials);
}

function sellone() {
	if (materials >= 1) sell(1);
}

function sellten() {
	if (materials >= 10) sell(10);
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
	workercost *= 2;
		
	workercount++;
		
	var interval = setInterval(function(){
		materials += workeradd;
	}, 1000);
}

function shop() {
	if (money >= (shopcost / 2) && materials >= (shopcost / 2)) {
		money -= (shopcost / 2);
		materials -= (shopcost / 2);
		
		shopcost *= 2;
			
		shopcount++;
		
		exchange += 0.1;
	}
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
	
	if (enough) upgrade++;
}