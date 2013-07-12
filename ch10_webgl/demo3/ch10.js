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

	var sharedVars = options.init(context, canvas);
	options.draw(context, sharedVars);
}

function demo3(){
	function init(context, $canvasElement){
		// setup a GLSL program
		var vertexShader = createShaderFromScriptElement(context, "2d-vertex-shader");
		var fragmentShader = createShaderFromScriptElement(context, "2d-fragment-shader");
		var program = createProgram(context, [vertexShader, fragmentShader]);
		context.useProgram(program);

		return {
			program: program
			, canvas: $canvasElement
		};
	}

	function draw(context, sharedVars){
		// set the resolution
		var resolutionLocation = context.getUniformLocation(sharedVars.program, "u_resolution");
		context.uniform2f(resolutionLocation, sharedVars.canvas.width(), sharedVars.canvas.height());

		var buffer = context.createBuffer();
		context.bindBuffer(context.ARRAY_BUFFER, buffer);
		context.bufferData(
		    context.ARRAY_BUFFER
		    , new Float32Array([10, 10, 90, 10, 10, 90])
		    , context.STATIC_DRAW
	    );

		context.enableVertexAttribArray(null);
		context.vertexAttribPointer(null, 2, context.FLOAT, false, 0, 0);

		// draw
		context.drawArrays(context.TRIANGLES, 0, 3);
	}

	var options = {
		init: init
		, draw: draw
	}

	$('body').webgl(options);
}

$(demo3);