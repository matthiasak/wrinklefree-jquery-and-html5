function filesDragged(e){
	e.stopPropagation();
	e.preventDefault();
	e.dataTransfer.dropEffect = 'copy';
	e.dataTransfer.effectAllowed = 'all';
}

function filesDropped(e){
	e.stopPropagation(); // Stops some browsers from redirecting.
	e.preventDefault();

	var files = e.dataTransfer.files //FileList object
		, output = $('.output');

	for(var i = 0, f; f = files[i]; i++){
		(function(file){
			// only process image files
			if(!f.type.match('image.*')){
				return;
			}
			var reader = new FileReader();
			reader.onload = function(e){
				output.append('<img src="'+e.target.result+'">');
			};
			reader.readAsDataURL(file);
		})(f);
	}
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

function demo4(){
	jQuery.event.props.push('dataTransfer');
	$('.output')
		.on('dragover', filesDragged)
		.on('drop', filesDropped);
}

$(demo4);