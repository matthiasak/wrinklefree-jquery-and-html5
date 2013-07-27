String.prototype.wrapSpans = function(){
	return '<span>'+this.toString()+'</span>';
}

function filesDragged(e){
	e.stopPropagation();
	e.preventDefault();
	e.dataTransfer.dropEffect = 'copy';
	e.dataTransfer.effectAllowed = 'all';
}

function empty(e){
	e.stopPropagation(); // Stops some browsers from redirecting.
	e.preventDefault();
}

function htmlEncode(value){
  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
  //then grab the encoded contents back out.  The div never exists on the page.
  return $('<div/>').text(value).html();
}

function htmlDecode(value){
  return $('<div/>').html(value).text();
}

function filesDropped(e){
	e.stopPropagation(); // Stops some browsers from redirecting.
	e.preventDefault();

	var files = e.dataTransfer.files //FileList object
		, output = []
		, promises = [];

	for(var i = 0, f; f = files[i]; i++){
		(function(file){
			var dfd = $.Deferred();
			promises.push(dfd.promise());
			var reader = new FileReader();
			reader.onload = function(e){
				output.push(
					'<li>'
					, file.name.wrapSpans()
					, htmlEncode(e.target.result).wrapSpans()
					, '</li>'
				);
				dfd.resolve();
			};
			reader.readAsText(file);
		})(f);
	}

	$.when.apply($, promises).then(function(){
		$('.output').html('<ul>'+output.join('')+'</ul>');
	})
}

$.filer = function(){
	// check for various File API support
	var hasFile = !!window.File,
		hasFileList = !!window.FileList,
		hasBlob = !!window.Blob,
		hasFileReader = !!window.FileReader;

	if(!hasFile || !hasBlob || !hasFileList || !hasFileReader){
		console.error('You don\'t have the required support for this feature. Please update your browser.');
		return false;
	}

	return true;
}

function demo3(){
	jQuery.event.props.push('dataTransfer');
	$('.output')
		.on('dragover', filesDragged)
		.on('drop', filesDropped);
}

$(demo3);