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

function filesDropped(e){
	e.stopPropagation(); // Stops some browsers from redirecting.
	e.preventDefault();

	var files = e.dataTransfer.files //FileList object
		, output = [];

	for(var i = 0, f; f = files[i]; i++){
		output.push(
			'<li>'
			, f.name.wrapSpans()
			, (f.type || 'no file type').wrapSpans()
			, (f.size + ' bytes').wrapSpans()
			, (f.lastModifiedDate ? f.lastModifiedDate.toLocaleString() : 'new file').wrapSpans()
			, '</li>'
		);
	}
	
	$('.output').html('<ul>'+output.join('')+'</ul>');
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

function demo2(){
	jQuery.event.props.push('dataTransfer');
	$('.output')
		.on('dragover', filesDragged)
		.on('drop', filesDropped);
}

$(demo2);