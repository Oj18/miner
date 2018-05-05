var materials = 0;
var money = 0;
var workercount = 0;
var workercost = 5;
var workeradd = 1;
var research = 0;
var autosell = false;
var hasautoSell = false;

function update() {
	document.getElementById("material-count").innerHTML = materials + " materials";
	document.getElementById("money-count").innerHTML = "$" + money;
	document.getElementById("worker-cost").innerHTML = "Costs: $" + workercost;
	document.getElementById("worker-count").innerHTML = workercount + " workers";
	
	if (workeradd == 1) {
		document.getElementById("worker-desc").innerHTML = "Mines 1 material per second";	
	} else {
		document.getElementById("worker-desc").innerHTML = "Mines " + workeradd + " materials per second";
	}
	
	
}

function setResearchText() {
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

function research() {
	if (research == 0) hasautosell = true;
	
	research++;
}