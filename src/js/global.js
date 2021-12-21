
(function( $ ) {
    $(function() {
        // Mobile navigation
        var $navToggle = $('.js-nav-toggle');

        $navToggle.on('click', openNav);

        function openNav() {
            $(this).toggleClass('is-active');
            $('.js-nav').toggleClass('is-opened');
        }
        
    });
})( jQuery );
