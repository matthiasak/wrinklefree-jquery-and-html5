;(function($, window){
	$.setStorage = function (key, data){
		try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch(e) {
            return false;
        }
	};

	$.existsInStorage = function(key){
		var data = $.parseJSON(localStorage.getItem(key) || 'false');
		return data;
	}

	$.clearStorage = function(){
		try{
			for(var i in localStorage){
				localStorage.removeItem(i);
			}
		} catch(e){

		}
	}

	window.jqLocalStorage = function(){
		this.head = document.head || document.getElementsByTagName('head')[0];
	}

	jqLocalStorage.prototype.isLocal = function(url){
		var hasHttp = url.indexOf('http://') != -1,
	        hasHttps = url.indexOf('https://') != -1,
	        hasSlashSlash = url.indexOf('//') != -1,
	        startsWithSlash = url.charAt(0) == '/';

	    return !hasHttp && !hasHttps && !hasSlashSlash;// && !startsWithSlash;
	}

	jqLocalStorage.prototype.isCSS = function (url){
		var isCSS = url.indexOf('.css') != -1;
		return isCSS;
	}

	jqLocalStorage.prototype.injectScriptTagByText = function (text){
		var script = document.createElement('script');
	    script.defer = true;
	    script.text = text;
	    this.head.appendChild(script);
	}

	jqLocalStorage.prototype.injectStyleTagByText = function (text){
	    $('head').append('<style>'+text+'</style>');
	}

	jqLocalStorage.prototype.injectScriptTagBySrc = function (url, dfd){
		var script = document.createElement('script');
		script.defer = true;
	    script.src = url;
	    script.onload = script.onreadystatechange = function(){
	    	dfd.resolve();
	    };
	    this.head.appendChild(script);
	}

	jqLocalStorage.prototype.injectStyleTagBySrc = function (url, fn){
		var style = document.createElement('link');
		style.href = url;
	    this.head.appendChild(style);
	}

	jqLocalStorage.prototype.loadScriptContentAndCacheIt = function (url){
		var self = this;
		return $.get(url, null, null, 'script').then(function(data, success, Promise){
			self.injectScriptTagByText(data);
			$.setStorage(url, data);
		});
	}

	jqLocalStorage.prototype.loadStyleContentAndCacheIt = function (url){
		var self = this;
		return $.get(url).then(function(data, success, Promise){
			self.injectStyleTagByText(data);
			$.setStorage(url, data);
		});	
	}

	jqLocalStorage.prototype.handle_file = function (file){
		if(!file || !file.url) return;

		var url = file.url,
			isCORS = file.CORS,
			isLocal = this.isLocal(url),
			data,
			dfd = $.Deferred();

		if(!this.isCSS(url)){
			if(isLocal){
				data = $.existsInStorage(url);
				if(data){
					this.injectScriptTagByText(data);
					dfd.resolve();
				} else {
					$.when(this.loadScriptContentAndCacheIt(url)).then(function(){
						dfd.resolve();
					});
				}
			} else {
				this.injectScriptTagBySrc(url, dfd);
			}
		} else {
			if(isLocal){
				data = $.existsInStorage(url);
				if(data){
					this.injectStyleTagByText(data);
					dfd.resolve();
				} else {
					$.when(this.loadStyleContentAndCacheIt(url)).then(function(){
						dfd.resolve();
					});
				}
			} else {
				this.injectStyleTagBySrc(url);
				dfd.resolve();
			}
		}

		return dfd.promise();
	}

	$.cacheFiles = function(){
		var jq = new jqLocalStorage();
		
		return function (files){
			var arr = [];

		    for(var i in files){
		    	arr.push(jq.handle_file(files[i]));
		    }
		    return $.when.apply($, arr)
		};
	}();

})(jQuery, window);

/**
 *  call by doing 
 *  var scripts = [{url: "...", CORS: true/false}, {url: "...", CORS: true/false}]
 *  $.cacheFiles(scripts);
 */