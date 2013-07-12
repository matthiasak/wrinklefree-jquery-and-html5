function demo1(){
	var canvas = document.getElementById('jqueryCanvas'); 
	var context = canvas.getContext('2d');
	context.fillStyle="salmon";
	context.fillRect(50,50,100,100);
}

function demo2(){
	var canvas = document.getElementById('jqueryCanvas'); 
	var context = canvas.getContext('2d');
	context.fillStyle = "salmon";
	context.beginPath();
	context.moveTo(50,20);
	context.lineTo(400,150);
	context.lineTo(150,380);
	context.closePath();
	context.fill();
	context.strokeStyle = 'red';
	context.lineWidth = 10;
	context.stroke();
}

function demo3(){
	var canvas = document.getElementById('jqueryCanvas'); 
	var context = canvas.getContext('2d');
	context.fillStyle = 'salmon';
	context.beginPath();
	context.moveTo(50,20);
	context.bezierCurveTo(100, 100, 300, 200, 400, 100);
	context.lineTo(150,380);
	context.closePath();
	context.fill();
	context.lineWidth = 10;
	context.strokeStyle = 'red';
	context.stroke();
}

function calculateMidpoint(pointA, pointB){
	return [(pointA[0]+pointB[0])/2, (pointA[1]+pointB[1])/2];
}

function demo4(){
	var canvas = document.getElementById('jqueryCanvas'); 
	var context = canvas.getContext('2d');

	var pointA = [50,20];
	var inflectionA = [100,100];
	var inflectionB = [300,200];
	var pointB = [400,100];
	var pointC = [150, 380];

	var midpointA = calculateMidpoint(pointA, inflectionA);
	var midpointB = calculateMidpoint(midpointA, inflectionB);
	var midpointC = calculateMidpoint(pointB, inflectionB);
	
	context.lineWidth = 10;

	context.beginPath();
	context.fillStyle = 'salmon';
	context.strokeStyle = 'red';
	context.moveTo(pointA[0],pointA[1]);
	context.bezierCurveTo(inflectionA[0], inflectionA[1], inflectionB[0], inflectionB[1], pointB[0], pointB[1]);
	context.lineTo(pointC[0], pointC[1]);
	context.closePath();
	context.fill();
	context.stroke();

	context.beginPath();
	context.fillStyle = '';
	context.strokeStyle = 'blue';
	context.moveTo(pointA[0], pointA[1]);
	context.lineTo(inflectionA[0], inflectionA[1]);
	context.stroke();

	context.beginPath();
	context.fillStyle = '';
	context.strokeStyle = 'blue';
	context.moveTo(pointB[0], pointB[1]);
	context.lineTo(inflectionB[0], inflectionB[1]);
	context.stroke();

	context.beginPath();
	context.fillStyle = '';
	context.strokeStyle = 'green';
	context.moveTo(midpointA[0], midpointA[1]);
	context.lineTo(inflectionB[0], inflectionB[1]);
	context.stroke();

	context.beginPath();
	context.fillStyle = '';
	context.strokeStyle = 'black';
	context.moveTo(midpointB[0], midpointB[1]);
	context.lineTo(midpointC[0], midpointC[1]);
	context.stroke();
}

function demo5(){
	var canvas = document.getElementById('jqueryCanvas'); 
	var context = canvas.getContext('2d');

	context.fillStyle = "#444";
	context.font = "32px Times New Roman";
	context.fillText("jQuery and HTML5!", 20,150);
}

function demo6(){
	var canvas = document.getElementById('jqueryCanvas'); 
	var context = canvas.getContext('2d');

	var gradient = context.createLinearGradient(0,0,400,0);
	gradient.addColorStop(0.33, "green");
	gradient.addColorStop(0.33, "white");
	gradient.addColorStop(0.66, "white");
	gradient.addColorStop(0.66, "red");

	context.fillStyle = gradient;
	context.fillRect(0,0,400,300);
}

function demo7(){
	var canvas = document.getElementById('jqueryCanvas'); 
	var context = canvas.getContext('2d');

	var gradient1 = context.createLinearGradient(0,0,100,0);
	gradient1.addColorStop(0.33, "green");
	gradient1.addColorStop(0.33, "white");
	gradient1.addColorStop(0.66, "white");
	gradient1.addColorStop(0.66, "red");
	context.fillStyle = gradient1;
	context.fillRect(0,0,100,75);

	var gradient2 = context.createLinearGradient(110,0,210,75);
	gradient2.addColorStop(0.33, "green");
	gradient2.addColorStop(0.33, "white");
	gradient2.addColorStop(0.66, "white");
	gradient2.addColorStop(0.66, "red");
	context.fillStyle = gradient2;
	context.fillRect(110,0,100,75);

	var gradient3 = context.createLinearGradient(220,0,220,75);
	gradient3.addColorStop(0.33, "green");
	gradient3.addColorStop(0.33, "white");
	gradient3.addColorStop(0.66, "white");
	gradient3.addColorStop(0.66, "red");

	context.fillStyle = gradient3;
	context.fillRect(220,0,100,75);
}

function demo8(){
	var canvas = document.getElementById('jqueryCanvas'); 
	var context = canvas.getContext('2d');

	var gradient1 = context.createLinearGradient(0,0,100,0);
	gradient1.addColorStop(0.33, "green");
	gradient1.addColorStop(0.33, "white");
	gradient1.addColorStop(0.66, "white");
	gradient1.addColorStop(0.66, "red");
	context.fillStyle = gradient1;
	context.fillRect(0,0,50,200); //--> changed

	var gradient2 = context.createLinearGradient(110,0,210,75);
	gradient2.addColorStop(0.33, "green");
	gradient2.addColorStop(0.33, "white");
	gradient2.addColorStop(0.66, "white");
	gradient2.addColorStop(0.66, "red");
	context.fillStyle = gradient2;
	context.fillRect(110,0,50,200); //--> changed

	var gradient3 = context.createLinearGradient(220,0,220,75);
	gradient3.addColorStop(0.33, "green");
	gradient3.addColorStop(0.33, "white");
	gradient3.addColorStop(0.66, "white");
	gradient3.addColorStop(0.66, "red");
	context.fillStyle = gradient3;
	context.fillRect(220,0,50,200); //--> changed
}

// function demo9(){} //--> relegated

function demo10(){
	var context = $.getCanvasContext();
	$('body').graph();
}

function demo11(){
	var cupsOfCoffeeDrank = [10, 5, 3, 1, 8, 3, 2];
	var context = $.getCanvasContext();
	$('body').graph({data: cupsOfCoffeeDrank});
}

$.getCanvasContext = function(selector){
	var canvas = $(selector || "canvas");
	var context = (canvas.length > 0 && canvas.first().is('canvas'))
		? canvas.get(0).getContext('2d') 
		: null;
	return context;
}

$.graphDefaults = {
	data: null,
	canvas: null
}

function randomInt(){
	return Math.floor(Math.random()*255);
}

function randomRGB(){
	return [randomInt(),randomInt(),randomInt()];
}

function randomRGBStringToHex(){
	var rgb = randomRGB();
	return rgb[0].toString(16)+rgb[1].toString(16)+rgb[2].toString(16);
}

$.fn.graph = function(options){
	options = $.extend({}, $.graphDefaults, options);

	var canvas = this.filter(function(i, el){
		return el.tagName==='CANVAS';
	});

	var self = this,
		width = this.width(),
		height = this.height();

	if(canvas.length === 0){
		canvas = $('<canvas></canvas>').attr({width:width, height:height});
		$('body').append(canvas);
	} else {
		canvas = canvas.get(0);
	}

	var context = $.getCanvasContext(canvas);

	$(window).on('resize', function(){
		width = self.width();
		height = self.height();
		canvas.attr({width:width, height:height});
		draw();
	});

	function draw(){
		// draw background
		context.fillStyle = "#efefef";
		context.fillRect(0,0,width,height);

		var vertical_padding = height*.1,
			horizontal_padding = width*.1,
			vertical_px = height*(1-(.1)*2),
			horizontal_px = width*(1-(.1)*2),
			maxCupsOfCoffee = 0,
			cups = options.data;

		for(var i = 0; i < cups.length; i++){
			maxCupsOfCoffee = maxCupsOfCoffee > cups[i] ? maxCupsOfCoffee : cups[i];
		}

		var vertical_steps = vertical_px / maxCupsOfCoffee;
		var horizontal_steps = horizontal_px / cups.length;

		//draw data 
		context.fillStyle = "red";
		//randomRGBStringToHex();
		for(var i=0; i<options.data.length; i++) { 
			var cupsOfCoffee = options.data[i];
			var barHeight = cupsOfCoffee*vertical_steps;
			context.fillRect(
				horizontal_padding + i*horizontal_steps,
				(height-vertical_padding)-barHeight,
				horizontal_padding,
				barHeight
			); 
		}

		//draw axis lines 
		var padding = 10
			, topY = vertical_padding - padding
			, leftX = horizontal_padding - padding
			, bottomY = (height-vertical_padding)+padding
			, rightX = (width-horizontal_padding)+padding;
		
		context.fillStyle = 'black';
		context.lineWidth = 2.0;
		context.beginPath();
		context.moveTo(leftX, topY);
		context.lineTo(leftX, bottomY);
		context.lineTo(rightX, bottomY);
		context.stroke();

		//draw text and interval lines 
		context.textAlign = 'right';
		for(var i = 0; i < maxCupsOfCoffee; i++) {
		    context.fillText( (maxCupsOfCoffee - i) + "", leftX-12, i*vertical_steps + vertical_padding + 3);
		    context.beginPath();
		    context.moveTo(horizontal_padding-20,i*vertical_steps + vertical_padding);
		    context.lineTo(horizontal_padding-10,i*vertical_steps + vertical_padding);
		    context.stroke();
		}

		context.textAlign = 'center';
		var labels = ["1 day ago","2 days ago","3 days ago","4 days ago","5 days ago","6 days ago","7 days ago"];
		for(var i=0; i<labels.length; i++) {
			context.fillText(labels[i], horizontal_padding + i*horizontal_steps + horizontal_padding/2, bottomY+12);
		}
	}

	draw();
}

$(demo11);
