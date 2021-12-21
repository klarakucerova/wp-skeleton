( function( $ ) {

    var $accordionTrigger = $('.accordion__trigger');

    $accordionTrigger.on('click', openAccordion);

    function openAccordion() {
        var $this = $(this),
            $accordionItem = $this.closest('.accordion'),
            $accordionItems = $('.accordion'),
            $hasClass = $accordionItem.hasClass('is-active');

        if ( $hasClass ) {
            $accordionItem.removeClass('is-active');
        }
        else {
            $accordionItems.each(function () {
                $accordionItems.removeClass('is-active');
            });

            $accordionItem.addClass('is-active');
        }
	}
	
} )( jQuery );
