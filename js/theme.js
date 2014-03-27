jQuery(document).ready(function( $ ){

	$('#mainmenu a').click(function( e ){
		
		var targetID = $(this).attr('href').substr(1);
	
		if( targetID && $('a[name='+ targetID +']') ) {
			e.preventDefault();

			// animate the browser slightly to the given area

			$('html, body').animate({
				scrollTop: $('a[name='+ targetID +']').offset().top
			}, 500);
		}
	});

	$(window).scroll(function(e){

		var windowOffsetTop = $(window).scrollTop();

		$('#content a').each(function(){
			var targetEl = $(this).attr('name');
			var elOffsetTop = $(this).offset().top;

			if( windowOffsetTop >= (elOffsetTop-24) ) {

				$('#mainmenu a').removeClass('active');
				$('#mainmenu a[href=#'+ targetEl +']').addClass('active');	
			}
			
		});
	});

	// FORMS

	$('#donate-form').submit(function(e){
		e.preventDefault();

		var data = $(this).serialize();

		$('#donate-form-reponse').html( 'Sending ...' );

		$.ajax({
			url: 'server/form.php',
			data: data,
			dataType: 'json',
			success: function( response ){
				console.log( response );
				$('#donate-form-reponse').html( response.message );
			}
		});
	});

});