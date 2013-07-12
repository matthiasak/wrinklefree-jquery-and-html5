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
		options.draw(context, sharedVars);
	});

	var sharedVars = options.init(context, canvas, options);
	sharedVars.image.onload = function(){
		sharedVars.isReady = true;
		options.draw(context, sharedVars);
	};
}

function demo4(){
	function init(context, $canvasElement, options){
		// setup a GLSL program
		var vertexShader = createShaderFromScriptElement(context, "2d-vertex-shader");
		var fragmentShader = createShaderFromScriptElement(context, "2d-fragment-shader");
		var program = createProgram(context, [vertexShader, fragmentShader]);
		context.useProgram(program);

		var image = new Image();
		image.src = options.image;

		return {
			program: program
			, canvas: $canvasElement
			, image: image
		};
	}

	function draw(context, sharedVars){
		if(!sharedVars.isReady){ return; }

		// get attributes
		var positionLocation = context.getAttribLocation(sharedVars.program, "a_position");
		var textureCoordinatesLocation = context.getAttribLocation(sharedVars.program, "a_textureCoordinates");

		// look up where the texture coordinates need to go.
		var textureCoordinatesBuffer = context.createBuffer();
		context.bindBuffer(context.ARRAY_BUFFER, textureCoordinatesBuffer);

		var buffer = context.createBuffer();
		context.bindBuffer(context.ARRAY_BUFFER, buffer);
		context.bufferData(
		    context.ARRAY_BUFFER
		    , new Float32Array([0, 0, 1, 1, 0, 1])
		    , context.STATIC_DRAW
		);
		context.enableVertexAttribArray(textureCoordinatesLocation);
		context.vertexAttribPointer(textureCoordinatesLocation, 2, context.FLOAT, false, 0, 0);

		// Create a texture.
		var texture = context.createTexture();
		context.bindTexture(context.TEXTURE_2D, texture);

		// Set the parameters so we can render any size image.
		context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
		context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
		context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
		context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);

		// Upload the image into the texture.
		context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, sharedVars.image);

		// set the resolution
		var resolutionLocation = context.getUniformLocation(sharedVars.program, "u_resolution");
		context.uniform2f(resolutionLocation, sharedVars.canvas.width(), sharedVars.canvas.height());

		var buffer = context.createBuffer();
		context.bindBuffer(context.ARRAY_BUFFER, buffer);
		context.enableVertexAttribArray(positionLocation);
		context.vertexAttribPointer(positionLocation, 2, context.FLOAT, false, 0, 0);

		context.bufferData(
		    context.ARRAY_BUFFER
		    , new Float32Array([10, 600, 600, 10, 10, 10])
		    , context.STATIC_DRAW
		);

		// draw
		context.drawArrays(context.TRIANGLES, 0, 3);
	}

	var options = {
		init: init
		, draw: draw
		, image: "../mountains.jpg"
	}

	$('body').webgl(options);
}

$(demo4);