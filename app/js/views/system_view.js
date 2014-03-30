/**
 * This class is used to render systems on top of the interface
 * systems can be selected to toggle their visibility
 */

SystemView = function( system ) {
	var $this = this;

	this.name = system.name;
	this.el = $('#systems');

	$systemEl = $('<div id="'+ this.name +'" ><i class="fa fa-eye"></i><span>'+ this.name +'</span></div>');
	$systemEl.addClass('system');

	// by default the system is visible
	$systemEl.addClass('active');
	$systemEl.css({'color': '#' + system.orbitColor.toString(16) });

	$systemEl.append('<span class="close"> &times; </span>');

	this.el.append( $systemEl );

	$systemEl.on('click', function( e ) {
		e.preventDefault();
		e.stopPropagation();

		var $el = $(this);

		_.each(App.systems, function(system, idx){
			if( system.name == $this.name ) {

				if( $el.hasClass('active') ) {
					$el.removeClass('active');
					console.log('hide system', $this.name);

					system.group.traverse(function (object) { 
						object.visible = false; 
					});

					// hide the labels too
					$('#labels span').each(function(){
						if ( $(this).hasClass('labelgroup-' + idx) ) {
							$(this).hide();
						}
					});

					system.isVisible = false;
					
					$el.find('i').removeClass('fa-eye');
					$el.find('i').addClass('fa-eye-slash');

				} else {
					$el.addClass('active');
					console.log('show system', $this.name);

					system.group.traverse(function (object) { 
						object.visible = true; 
					});

					//show the labels too
					$('#labels span').each(function(){
						if ( $(this).hasClass('labelgroup-' + idx) ) {
							$(this).show();
						}
					});

					system.isVisible = true;
					
					$el.find('i').removeClass('fa-eye-slash');
					$el.find('i').addClass('fa-eye');
				}

				// set the habitable zone correctly
				if( $el.hasClass('active') ) {

					if( Settings.filters.habitableZones ) {
						App.habitableZones[idx].visible = true;
					}else{
						App.habitableZones[idx].visible = false;
					}
				} 
				else {
					if( Settings.filters.habitableZones ) {
						App.habitableZones[idx].visible = false;
					}else{
						App.habitableZones[idx].visible = false;
					}
				}

			}
		});
	});

	$systemEl.find('.close').on('click', function() {
		var _this = $(this);

		_this.parent().remove();

		// remove the rendered elements from the scene
		_.each( App.systems, function( system, idx ){

			if( system.name == _this.parent().attr('id') ) {
				console.log('removing ', system, ' from scene');
				App.scene.remove( system.group );

				$('#labels span').each(function(){
					if ( system.name == $(this).attr('rel') ) {
						$(this).remove();
					}
				});

				App.habitableZones.splice( idx, 1 );
				App.systems.splice( idx, 1 );
			}

		});

		$this.updatePosition();
	});

	// resize the width and place it to the center of the screen
	this.updatePosition = function() {
		$this.el.css({
			'margin-left': - $this.el.width() / 2
		});
	};

	this.updatePosition();

};
