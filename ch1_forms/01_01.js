;(function($) {
    $.fn.pluginName = function(options) {
        var defaults = {
            propertyName: 'value',
            onSomeEvent: function() {}
        }

        options = $.extend(defaults, options);

        var init = function() {
            return this.each(function(){
                // code goes here
            });
        }

        this.public_method = function() { ... }

        var private_method = function() { ... }

        init();
    }
})(jQuery);