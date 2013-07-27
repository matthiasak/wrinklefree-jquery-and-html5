String.prototype.wrapSpans = function(){
	return '<span>'+this.toString()+'</span>';
}

function htmlEncode(value){
  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
  //then grab the encoded contents back out.  The div never exists on the page.
  return $('<div/>').text(value).html();
}

function htmlDecode(value){
  return $('<div/>').html(value).text();
}

function filesDragged(e){
	e.stopPropagation();
	e.preventDefault();
	e.dataTransfer.dropEffect = 'copy';
	e.dataTransfer.effectAllowed = 'all';
}

function filesDropped(e){
	e.stopPropagation(); // Stops some browsers from redirecting.
	e.preventDefault();

	var list = $("<ul></ul>")
		, files = e.dataTransfer.files //FileList object
		, output = $('.output').append(list) && list;

	for(var i = 0, f; f = files[i]; i++){
		(function(file){
			var reader = new FileReader()
				, start = 0
				, end = Math.floor(Math.random()*(file.size-1))
				, blob = file.slice(start, end + 1);
			reader.onloadend = function(e){
				if(e.target.readyState == FileReader.DONE){
					output.append(
						[
							'<li>'
							, ('byte data: ' + htmlEncode(e.target.result)).wrapSpans()
							, ('byte range from: ' + start + ' to ' + end + ' of ' + file.size + ' byte file.').wrapSpans()
							, '</li>'
						].join('')
					);
				}
			};
			reader.readAsBinaryString(blob);
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