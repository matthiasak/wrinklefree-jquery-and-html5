$.getCanvasWebGLContext = function(selector){
	var canvas = $(selector || "canvas");
	var context = (canvas.length > 0 && canvas.first().is('canvas'))
		? canvas.get(0).getContext('experimental-webgl') 
		: null;
	return context;
}

$.webglDefaults = {
	draw: function(){}
	, init: function(){}
};

$.fn.webgl = function(options){
	options = $.extend({}, $.webglDefaults, options);

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

	var context = $.getCanvasWebGLContext(canvas);

	$(window).on('resize', function(){
		width = self.width();
		height = self.height();
		canvas.attr({width:width, height:height});
		options.draw(context, positionLocation);
	});

	var positionLocation = options.init(context);
	options.draw(context, positionLocation);
}

function demo1(){
	function init(context){
		// setup a GLSL program
		var vertexShader = createShaderFromScriptElement(context, "2d-vertex-shader");
		var fragmentShader = createShaderFromScriptElement(context, "2d-fragment-shader");
		var program = createProgram(context, [vertexShader, fragmentShader]);
		context.useProgram(program);

		// look up where the vertex data needs to go.
		var positionLocation = context.getAttribLocation(program, "a_position");

		return positionLocation;
	}

	function draw(context, positionLocation){
		// Create a buffer and put a single clipspace rectangle in
		// it (2 triangles)
		var buffer = context.createBuffer();
		context.bindBuffer(context.ARRAY_BUFFER, buffer);
		context.bufferData(
		    context.ARRAY_BUFFER, 
		    new Float32Array([
		        -1.0, -1.0, 
		         1.0, -1.0, 
		        -1.0,  1.0, 
		        -1.0,  1.0, 
		         1.0, -1.0, 
		         1.0,  1.0]), 
		    context.STATIC_DRAW);
		context.enableVertexAttribArray(positionLocation);
		context.vertexAttribPointer(positionLocation, 2, context.FLOAT, false, 0, 0);

		// draw
		context.drawArrays(context.TRIANGLES, 0, 3);
	}

	var options = {
		init: init
		, draw: draw
	}

	$('body').webgl(options);
}

$(demo1);