TooltipView = function( event, obj ) {

	this.event = event;
	this.data = obj;
	this.labels = [
		'Name',
		'Spectral type',
		'Distance (PC / LY)',
		'Mass (Sun)',
		'Radius (Sun)',
		'Planets'
	];

	// remove any existing tooltip that was rendered before
	$('#tooltip').remove();

	// add some basic information to the screen
	this.el = $('<div id="tooltip"></div>');

	//console.log('event', event);

	this.el.css({
		'left': event.clientX + 24,
		'top': event.clientY + 24,
	});

	var $this = this;

	// add the properties to the tooltip content
	if( obj.properties ) {


		var $starNameDiv = $('<div class="property"></div>');
		$starNameDiv.append('<div class="headline">'+ $this.labels[ 0 ] +'</div>');

		
		var i = 0;
		_.each( obj.properties, function( property ){

			var $property = $('<div class="property"></div>');

			$property.append('<div class="label"><span>'+ window.language.translate( $this.labels[ i ] ) +'</span></div>');

			property = property || '-';
			$property.append('<div class="value"><span>'+ property +'</span></div>');

			$this.el.append( $property );
			i++;
		});
	}

	$('body').append( this.el );


	this.renderPlanetView = function(){
		var $this = this;

		this.el.addClass('planet-tooltip');
		this.el.append( this.obj );

		$planetView = $('body').find('#planet-view');

		if( $planetView.length ) {
			$('#planet-view').empty();
		} else {
			$planetView = $('<div id="planet-view"></div>');
		}

		$planetView.load('js/templates/planet_view.html?date=' + Math.random(), function(template) {

			$planetView.append('<span class="close-btn"> &times; </span>');

			// set values
			for( var key in obj ) {
				var val = obj[key];

				if( key == 'radius') {
					val = parseFloat(val);
					val = val / Settings.radiusEarth;
					val = val.toFixed(4)
				}

				if( key == 'semiMajorAxis') {
					val = parseFloat(val);
					val = val / Settings.AU;
					val = val.toFixed(4);
				}

				if( key == 'temparature') {
					val = parseFloat(val);
					var degress = Math.round( val + Settings.Kelvin );
					val = val + 'K (' + degress + '&deg;)';
					console.log(val);
				}

				if ( key == 'habitable') {
					val = (val == '0') ? '-' : 'yes';
				}

				if( val !== undefined) {
					$planetView.find('#planet-' + key).html('<span>' + val + '</span>');
				} else
					$planetView.find('#planet-' + key).parent().remove();
			}

			// add additional values
			$('#planet-image').attr('src', 'img/planets/'+ obj.image +'');
		});

		$('body').append( $planetView );


		$(document).on('click', '#planet-view .close-btn', function(e){
			e.preventDefault();
			$('#planet-view').remove();
		});

	}
};