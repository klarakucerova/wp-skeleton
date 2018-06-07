/* global window, document, jQuery */
'use strict';

(function( $ ) {

    $( function() {
        var $modalTrigger = $('.js-modal-trigger'),
            $modalClose = $('.js-modal-close'),
            $modalOverlay = $('.js-modal-overlay'),
            $modalContent = $('.modal');
        
        $modalTrigger.on('click', displayModal);
        $modalClose.on('click', displayModal);
        $modalOverlay.on('click', displayModal);

        function displayModal() {
            $modalContent.toggleClass('is-zoomed');
        }
    });

})( jQuery );
