String.prototype.wrapSpans = function(){
	return '<span>'+this.toString()+'</span>';
}

function filesSelected(e){
	var files = e.target.files //FileList object
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

	$('.output').html('<ul>'+output.join(' ')+'</ul>');
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

function demo1(){
	$('input[type=file]').on('change', filesSelected);
}

$(demo1);