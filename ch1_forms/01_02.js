;(function($) {
    $.fn.CatForm = function(options) {
        var defaults = {
            Title: 'Cat Registration Form',
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