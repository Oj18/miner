var materials = 0;
var money = 0;
var workercount = 0;
var workercost = 5;
var workeradd = 1;
var upgrade = 0;
var autosell = false;
var hasautosell = false;

function update() {
	if (hasautosell) {
		document.getElementById("autosell").hidden = false;
		if (autosell) {
			document.getElementById("autosell").innerHTML = "Autosell ON";
		} else {
			document.getElementById("autosell").innerHTML = "Autosell OFF";
		}
	} else {
		document.getElementById("autosell").hidden = true;
	}
	
	if (autosell) {
		money += materials;
		materials = 0;	
	}
	
	document.getElementById("material-count").innerHTML = materials + " materials";
	document.getElementById("money-count").innerHTML = "$" + money;
	document.getElementById("worker-cost").innerHTML = "Costs: $" + workercost;
	document.getElementById("worker-count").innerHTML = workercount + " workers";
	
	if (workeradd == 1) {
		document.getElementById("worker-desc").innerHTML = "Mines 1 material per second";	
	} else {
		document.getElementById("worker-desc").innerHTML = "Mines " + workeradd + " materials per second";
	}
	
	setUpgradeText();
}

function toggleAutosell() {
	autosell = !autosell;
}

function setUpgradeText() {
	if (upgrade == 0) {
		document.getElementById("upgrade-title").innerHTML = "Auto Seller";
		document.getElementById("upgrade-cost").innerHTML = "Costs: $15";
		document.getElementById("upgrade-desc").innerHTML = "Adds a switch to automaticly sell materials (toggleable)";
	}
	
	if (upgrade == 1) {
		if (workercount >= 5) {
			if (!$(".upgrade").is(":visible")) $(".upgrade").fadeIn("slow");
			
			document.getElementById("upgrade-title").innerHTML = "Hard hats";
			document.getElementById("upgrade-cost").innerHTML = "Costs: $100";
			document.getElementById("upgrade-desc").innerHTML = "Hard hats for your workers to wear... +1 material per second for workers";
		} else {
			if ($(".upgrade").is(":visible")) $(".upgrade").fadeOut("slow");
		}
	}
	
	if (upgrade == 2) {
		if (workercount >= 10) {
			if (!$(".upgrade").is(":visible")) $(".upgrade").fadeIn("slow");
			
			document.getElementById("upgrade-title").innerHTML = "High-Vis Jackets";
			document.getElementById("upgrade-cost").innerHTML = "Costs: $300";
			document.getElementById("upgrade-desc").innerHTML = "Some high-vis jackets so your workers will be seen... +1 material per second for workers";
		} else {
			if ($(".upgrade").is(":visible")) $(".upgrade").fadeOut("slow");
		}
	}
}

function run() {
	update();
	var interval = setInterval(function(){
		update();
	}, 1);
}

function mine() {
	materials++;	
}

function sellall() {
	money += materials;
	materials = 0;
}

function sell() {
	if (materials >= 1) {
		materials--;
		money++;
	}
}

function sellmore() {
	if (materials >= 10) {
		materials -= 10;
		money += 10;
	}
}

function worker() {
	if (money >= workercost) {
		money -= workercost;
		workercost *= 1.8;
		workercost = Math.round(workercost);
		workercount++;
		var interval = setInterval(function(){
			materials += workeradd;
		}, 1000);
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
	
	if (enough) upgrade++;
}