;(function($){
    $.fn.bootsy = function(options){
        var defaults = {
            interval: 0, // interval in seconds, not milliseconds
            permission_denied: 'Permission denied, human!',
            position_unavailable: 'Can\'t get the position, human!',
            timeout: 'Timed out! :('
        };

        var positionOptions = {
            enableHighAccuracy: true, // true or false
            timeout: 5000, // in milliseconds
            maximumAge: 30000  // in milliseconds
        };

        options = $.extend(defaults, options);
        
        // simple test for Geolocation
        if(!navigator || !navigator.geolocation || !navigator.geolocation.getCurrentPosition) {
            return;
        }
        
        // else we have geolocation support, print out something into
        // jQuery elements provided
        this.each(function(el){
            el.text('Hooray! We have Geolocation support! Boots the Saint Bernard will love this!');
        });
        
        var $this = this;
        
        var error_function = function(positionError){
            var code = positionError.code,
                message = positionError.message;
            
            switch(code){
                case 1: /// PERMISSION DENIED
                    $this.each(function(el){
                        el.text(options.permission_denied);
                    });
                    break;
                case 2: /// POSITION UNAVAILABLE
                    $this.each(function(el){
                        el.text(options.position_unavailable);
                    });
                    break;
                case 3: /// TIMEOUT
                    $this.each(function(el){
                        el.text(options.timeout);
                    });
                    break;
            }
        }
        
        var callback_function = function(position){
            var latitude = position.coords.latitude,
                longitude = position.coords.longitude,
                altitude = position.coords.altitude,
                accuracy = position.coords.accuracy,
                altitudeAccuracy = position.coords.altitudeAccuracy,
                heading = position.coords.heading,
                speed = position.coords.speed,
                timestamp = position.timestamp;

            $this.each(function(el){
                el.text('We have located you at ' + latitude + ', ' + longitude + ' -- ' + new Date(timestamp).toLocaleString());
            });
        }
        
        var get_location = function(){
            navigator.geolocation.getCurrentPosition(callback_function, error_function, positionOptions);
        }
        
        if(options.interval) {
            setInterval(function() {
                get_location();
            }, options.interval * 1000);
        } else {
            get_location();
        }
    };
})(jQuery);