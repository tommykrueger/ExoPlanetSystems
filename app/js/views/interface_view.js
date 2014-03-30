var InterfaceView = {

	el: '#interface',

	menu: {
		'Compare': {
			icon: 'fa-eye',
			children: [
				{
					name: 'Stars',
					id: 'compare-stars',
					title: 'Compare Stars of the current viewed Systems'
				},
				{ 
					name: 'Planets',
					id: 'compare-planets',
					title: 'Compare Planets of the current viewed Systems'
				}
			]
		},
		'Statistics': {
			icon: 'fa-th',
			id: 'statistics',
			popup: true
		},
		'Views': {
			icon: 'fa-eye',
			children: [
				{
					name: 'Default View (3D)',
					id: 'default'
				},
				{
					name: 'From Top (2D)',
					id: 'top'
				}
			]
		},
		'Stars': {
			icon: 'fa-star',
			id: 'stars',
			html: '<div id="stars-settings"><span class="stars-label">Star planets</span>: <span id="stars-planets-amount">0</span><div id="stars-planets-slider"></div><span class="stars-label">Star distance</span>: <span id="stars-distance-amount">0</span><div id="stars-distance-slider"></div></div>'
		},
		'Search': {
			icon: 'fa-search',
			id: 'search',
			html: '<input type="text" id="search" value="Search"/>'
		}
	},

	filters: [
		{
			'id': 'filter-orbits',
			'label': 'Orbits',
			'checked': true,
			'type': 'checkbox'
		},
		{
			'id': 'filter-labels',
			'label': 'Labels',
			'checked': true,
			'type': 'checkbox'
		},
		{
			'id': 'filter-habitable-zones',
			'label': 'Habitable Zone',
			'checked': false,
			'type': 'checkbox'
		},
		{
			'id': 'filter-grid-plane',
			'label': 'System Plane',
			'checked': true,
			'type': 'checkbox',
		},
		{
			'id': 'filter-inclination',
			'label': 'Inclination',
			'checked': true,
			'type': 'checkbox'
		},
		{
			'id': 'filter-stars',
			'label': 'Stars',
			'checked': true,
			'type': 'checkbox'
		},
		{
			'id': 'filter-minor-objects',
			'label': 'Minor Objects',
			'checked': true,
			'type': 'checkbox'
		},
		{
			'id': 'filter-distances',
			'label': 'Distances',
			'checked': Settings.showDistances,
			'type': 'checkbox'
		}
	]
};

// render the view to the screen
InterfaceView.init = function() {
	
	this.renderMenu();

	// add some basic information to the screen
	var $statistics = $('<div id="statistics"></div>');
	$statisticsItem = $('<div id="statistics-item"></div>');

	$statisticsItem.append('<span id="title">Distance to Sun</span>');

	$statisticsItem.append('<div><span class="label">KM</span> <span class="value" id="distance-solar-center"></span></div>');
	$statisticsItem.append('<div><span class="label">AU</span> <span class="value" id="distance-au"></span></div>');
	$statisticsItem.append('<div><span class="label">LY</span> <span class="value" id="distance-ly"></span></div>');
	$statisticsItem.append('<div><span class="label">PC</span> <span class="value" id="distance-pc"></span></div>');

	$('body').append( $statistics.append( $statisticsItem ) );


	// render the items
	//$(this.el).append('<span>Search</span> <input type="text" id="search"/>');

	// render simulation time field
	var $speedControls = $('<div id="speed-controls"></div>');
	$(this.el).append( $speedControls );

	$speedControls.append('<div class="play-pause-btn" id="play-pause-btn"><i class="fa fa-pause"></i></div>');
	$speedControls.append('<span class="speed-btn" id="speed-minus"> &minus; </span>');
	$speedControls.append('<span class="default-speed-btn">1&times;</span>');
	$speedControls.append('<span class="speed-btn" id="speed-plus"> &plus; </span>');

	// add languages
	var $languageList = $('<ul id="language-list"></ul>');

	$languageList.append('<li id="en"></li>');
	$languageList.append('<li id="de"></li>');

	$(this.el).append( $languageList );

	// add the filter button
	$(this.el).append('<div id="filters" class="bg-gradient"><i class="fa fa-check-square"></i><span>Filters</span></div>');


	// render the filters
	var $filters = $('<div id="filter-list"></div>');
	$filters.addClass('active');

	_.each( this.filters, function( filter, idx ){
		
		var $item = $('<input id="'+ filter.id +'" type="'+ filter.type +'" />');

		if( filter.checked ) {
			$item.attr('checked', true);
		}

		var $itemLabel = $('<label for="'+ filter.id +'">'+ filter.label +'</label>');

		var $itemContainer = $('<div class="item-container" />');

		$itemContainer.append( $item )
		$itemContainer.append( $itemLabel );

		$filters.append( $itemContainer );

	});
	
	$('body').append( $filters );


	// events

	$(this.el).hover(function(e){
		e.stopPropagation();
	});


	var searchTimeout = null;  

	$(document).on('click', '#search', function(e){
		$(this).focus();
	});

	$(document).on('mouseover', '#search', function(e){
		$(this).focus();
	});

	$(document).on('keyup', '#search', function(e){
		$(this).focus();

		// start searching stars and planets from the database

		if( $(this).val().length > 2 ) {

			var key = $(this).val();

		  //if (globalTimeout != null) {
		    clearTimeout(searchTimeout);
		  //}

		  searchTimeout = setTimeout(function() {
		    searchTimeout = null;  

		    $('#console').html('<p><span>Searching for:</span> '+ key +'</p>').addClass('active');

		    $.ajax({
					url: '../backend/phlplanets/find',
					data: 'data=' + key,
					dataType: 'json',
					error: function( e ){
						console.log( e );
					}, 
					success: function( data ){
						//console.log( 'planets count: ', data.length );
						console.log( data.length );

						// render the list
						$('#search-list').remove();
						$searchList = $('<ul id="search-list"></ul>');

						if( !data.length ) {
							$('#console').html('<span> No results found!</span>').addClass('active').delay(3000).queue(function(){
								$(this).removeClass('active');
							})
						}

						else {

							_.each(data, function(hostname, idx) {

								if( hostname.type[0] )
									spectralLetter = hostname.type[0].toLowerCase();

								var $li = $('<li id="'+ hostname.pl_hostname.toLowerCase() +'"></li>');

								$li.append('<span class="system-hostname">'+ hostname.pl_hostname +'</span>');

								var $divBlock = $('<div/>');
								$divBlock.append('<span class="system-label">Planets</span>');
								$divBlock.append('<span class="system-label system-planet-number"> '+ hostname.pl_num +'</span>');
								$li.append( $divBlock );

								var $divBlock = $('<div/>');
								$divBlock.append('<span class="system-label">Dist.</span>');
								$divBlock.append('<span class="system-label system-distance"> '+ hostname.dist +' ('+ (hostname.dist * Settings.PC).toFixed(2) +'LY)</span>');
								 
								$li.append( $divBlock );

								var $divBlock = $('<div/>');
								$divBlock.append('<span class="system-label">Spec. Type</span>');
								$divBlock.append('<span class="system-label system-type"> '+ hostname.type +' ('+ Settings.spectralNames[ spectralLetter ] +')</span>');
								$li.append( $divBlock );

								var $divBlock = $('<div/>');
								$divBlock.append('<span class="system-label">Hab. Planets</span>');
								$divBlock.append('<span class="system-label system-habitable-planets"> '+ hostname.habitable_planets +'</span>');
								$li.append( $divBlock );

								$searchList.append( $li );
							});

							$('#interface').append( 
								$searchList.css({
									'top': ( $('#search').offset().top + 35 ) + 'px',
									'left': 0 + 'px'
								}) 
							);

							$('#console').removeClass('active');
						}
					}
				});

		  }, 300);    
		}

	});

	
	$(document).on('mouseover', '#search-list li', 
		function(e){
			$(this).find('.properties').fadeIn();
		},
		function(e){
			$(this).find('.properties').fadeOut();
		}
	);

	$(document).on('click', '#search-list li', function(e) {

		//$this->
		$('#console').html('Add Planet System, please wait ...');

		App.addSystem( $(this).attr('id') );
	});



	// sim speed controls
	$(document).on('click', '#play-pause-btn', function(e){
		$(this).focus();

		console.log('paused');

		if( $(this).hasClass('paused') ) {
			App.currentSpeed = App.defaultSpeed;

			$(this).find('i').removeClass('fa-play');
			$(this).find('i').addClass('fa-pause');

			$(this).removeClass('paused');
		}else{
			App.currentSpeed = 0;

			$(this).find('i').removeClass('fa-pause');
			$(this).find('i').addClass('fa-play');

			$(this).addClass('paused');
		}

		$('.default-speed-btn').html( App.currentSpeed / App.defaultSpeed + '&times;');
	});

	$(document).on('click', '.speed-btn', function(e){
		$(this).focus();

		if( $(this).attr('id') == 'speed-plus' ) {
			App.currentSpeed *= 2;
		}else{
			App.currentSpeed /= 2;
		}

		console.log('set speed to', App.currentSpeed);

		var newSpeed = App.currentSpeed / App.defaultSpeed;

		if( newSpeed < 1 ) {
			newSpeed = newSpeed.toFixed(4);
		}

		$('.default-speed-btn').html( newSpeed + '&times;');
	});

	$(document).on('click', '.default-speed-btn', function(e){

		console.log('set speed to', App.defaultSpeed);
		App.currentSpeed = App.defaultSpeed;
		$('.default-speed-btn').html( App.currentSpeed / App.defaultSpeed + '&times;');
	});

	$(document).on('click', 'input, label', function(e){
		
		var type = $(e.target).attr('id');

		switch( type ) {
			case 'filter-orbits':

				_.each( App.orbits, function( orbit, idx ) {

					if( orbit.line ) {
						if( orbit.line.material.opacity == 0.0 )
							orbit.line.material.opacity = Settings.orbitTransparency;
						else
							orbit.line.material.opacity = 0.0;	
					}
					
				});

			break;

			case 'filter-labels':
				$('#labels').toggle();
			break;
			case 'filter-habitable-zones':
				Settings.filters.habitableZones = !Settings.filters.habitableZones;

				console.log( App.systems );

				_.each( App.systems, function( system, idx ) {

					if( App.systems[idx].isVisible ) {
						
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
						
				});

			break;

			case 'filter-grid-plane':
				console.log(App.gridPlane);
				_.each( App.gridPlane.children, function( gridItem, idx ) {
					gridItem.visible = !gridItem.visible;
				});
				//App.gridPlane.visible = !App.gridPlane.visible;

			break;

			
			case 'filter-inclination':	

				Settings.showInclination = !Settings.showInclination;

				_.each( App.meshes, function( mesh, idx ) {

					//console.log( mesh.parent.parent.parent );
					if( mesh.parent.parent.parent ) {
						if( Settings.showInclination === false ) {
							mesh.parent.parent.parent.rotation.x = 0;
						}
						else {
							mesh.parent.parent.parent.rotation.x = parseFloat(mesh.parent.parent.parent.inclination) * Math.PI/180;
						}
					}
					
				});

			break;

			case 'filter-stars':
					
				Settings.showStars = !Settings.showStars;	
				App.particleSystems.traverse(function(child) { 
			    if (child.visible)
						child.visible = false;
					else
						child.visible = true;
				});

			break;
			case 'filter-minor-objects':

				_.each( App.orbits, function( orbit, idx ) {

					if( orbit.line && orbit.type != 'planet' ) {
						if( orbit.line.material.opacity == 0.0 )
							orbit.line.material.opacity = Settings.orbitTransparency;
						else
							orbit.line.material.opacity = 0.0;	
					}
					
				});

			break;
			case 'filter-distances':

				Settings.showDistances = !Settings.showDistances;
			break;
		}

		//console.log(App.orbits);

	});

	// label hovering causes orbit brushing
	$(document).on('mouseenter', '.space-label', function(e) {

		var relatedObject = $(this).attr('id').replace('object-', '');

		//console.log(relatedObject);
		_.each( App.meshes, function( mesh, idx ) {
			if( mesh.name == relatedObject ) {
				//var tooltipView = new TooltipView(e, mesh.properties);
				//tooltipView.renderPlanetView();
			}
		});

		_.each( App.orbits, function( orbit, idx ) {
			if( orbit.name == relatedObject ) {
				orbit.line.material.color = new THREE.Color( 0xffffff );
				orbit.line.opacity = 1.0;

				// taken from http://stackoverflow.com/questions/14431545/how-can-i-control-line-width-using-the-three-js-createmultimaterialobject-functi
				// orbit.line.children.scale.multiplyScalar(1.01);
			}
		});
	});

	$(document).on('mouseleave', '.space-label', function(e) {
		_.each( App.orbits, function( orbit, idx ) {

			if( orbit.line )
				orbit.line.material.color = new THREE.Color( orbit.line.orbitColor );
				orbit.line.opacity = Settings.orbitTransparency;
		});
	});

	// click on a label binds the camera to the moving object
	$(document).on('click', '.space-label, .planet span', function(e) {

		var relatedObject = $(this).attr('id').replace('object-', '');

		console.log('load planet details for:', relatedObject);

		_.each( App.meshes, function( mesh, idx ) {
			if( mesh.name == relatedObject ) {
				var tooltipView = new TooltipView(e, mesh.properties);
				tooltipView.renderPlanetView();
			}
		});

		//App.bindCamera( relatedObject );
	});

	$(document).on('click', '#canvas', function(event) {
		var properties = App.currentStar.properties;

		if( properties && properties.name ) {
			App.addSystem( properties.name.toLowerCase() );
		}
	});

	// filter events
	$(document).on('click', '#filters', function(){

		var filterListWidth = $('#filter-list').width();

		if( $('#filter-list').hasClass('active') ) {

			$('#filter-list').removeClass('active');
			$('#filter-list').stop().animate({'right': -(filterListWidth + 12) }, 250);			
		}
		else {

			$('#filter-list').addClass('active');	
			$('#filter-list').stop().animate({'right': 0}, 250);	
		}	
	});

	$(document).on('click', '#language-list li', function(){
		var lang = $(this).attr('id');

		window.language.changeLanguage( lang );
	});

	// call this after js stack has been cleared
	_.defer(function(){	
		$('#time').attr('value', App.currentSpeed);
	});

};


InterfaceView.renderMenu = function(){

	var $menu = $('<ul id="menu"></ul>');
	_.each( this.menu, function( menuChildren, menuItem ) {

		$listItem = $('<li><i class="fa '+ menuChildren.icon +'"></i><span>'+ menuItem +'</span></li>');
		
		$listItem.attr('id', 'menu-' + menuItem.toLowerCase() );
		$listItem.attr('class', 'menu-item bg-gradient');
		$listItem.attr('title', menuItem.title || '');

		if( menuChildren.children ) {

			$subList = $('<ul class="submenu"></ul>');
			_.each( menuChildren.children, function( item, idx ) {
				$subList.append( $('<li class="submenu-item" id="'+ item.id +'" title="' + item.title + '"><span>'+ item.name +'</span></li>') );
			});

			$listItem.append( $subList );
		}

		if( menuChildren.html ) {

			$subList = $('<ul class="submenu"></ul>');
			$subList.append( $('<li class="submenu-item" id="'+ menuChildren.id +'-item" title="' + menuChildren.title + '">'+ menuChildren.html +'</li>') );

			$listItem.append( $subList );
		}

		$menu.append( $listItem );
	});

	$(this.el).append( $menu );


	// menu events
	$('#menu li.menu-item').on('click', function(e){
		e.preventDefault();

		var itemID = $(this).attr('id');

		// the menu item does not have children
		if( !$(this).find('ul.submenu') ) {
			PopupView.init({
				ajaxUrl: 'data/' + itemID
			});
		}
		if( itemID != 'menu-search' ) {
			$('#search-list').hide();
		}

		if( itemID == 'menu-statistics' ) {

			var statisticsModel = new StatisticsModel({
				popup: true
			});
			statisticsModel.render();
		}

		if( itemID == 'menu-stars' ) {

			if( !$(this).hasClass('rendered') ) {

				// activate the range sliders
				$('#stars-planets-slider').slider({
		      range: true,
		      min: Settings.stars.minPlanets,
		      max: Settings.stars.maxPlanets,
		      values: [Settings.stars.minPlanets, Settings.stars.maxPlanets],
		      slide: function( event, ui ) {
		        $('#stars-planets-amount').text( ui.values[0] + ' - ' + ui.values[1] );

		        Settings.stars.minPlanets = ui.values[0];
		        Settings.stars.maxPlanets = ui.values[1];

		        // remove all stars first
		        App.scene.remove(App.particleSystems);
		       	new ParticleStars( App, App.loadedStars);	        
		      }
	   		});

	   		$('#stars-distance-slider').slider({
		      range: true,
		      min: Settings.stars.minDistance,
		      max: Settings.stars.maxDistance,
		      step: 10,
		      values: [Settings.stars.minDistance, Settings.stars.maxDistance],
		      slide: function( event, ui ) {
		        $('#stars-distance-amount').text( ui.values[0] + ' - ' + ui.values[1] + ' LY');

		        Settings.stars.minDistance = ui.values[0];
		        Settings.stars.maxDistance = ui.values[1];

		        // remove all stars first
		        App.scene.remove(App.particleSystems);
		       	new ParticleStars( App, App.loadedStars);	
		      }
	   		});

	   		$('#stars-planets-amount').text( $('#stars-planets-slider').slider('values', 0)  + ' - ' + $('#stars-planets-slider').slider('values', 1) );
	   		$('#stars-distance-amount').text( $('#stars-distance-slider').slider('values', 0)  + ' - ' + $('#stars-distance-slider').slider('values', 1) + ' LY');

   		} 

   		$(this).addClass('rendered');
		}

	});

	$('#menu li.menu-item li').on('click', function(e){
		e.preventDefault();

		var id = $(this).attr('id');

		switch( id ) {
			case 'default':
				App.moveCamera({
					position: {
						x: -216,
						y: 1400,
						z: 2000
					}
				});
			break;
			case 'top':
				App.moveCamera({
					position: {
						x: 0,
						y: 5000,
						z: 0
					}
				});
			case 'compare-planets':
				PopupView.init(App.systems, id);
			break;

			case 'compare-stars':
				PopupView.init(App.meshes, id);
			break;
		}

		return false;
	});

	// events
	$('#menu li.menu-item').on('click', function(e){
		e.preventDefault();
		e.stopPropagation();

		$menu = $(this);

		if( $menu.hasClass('active') )
			$menu.removeClass('active');
		else {
			$('#menu li.menu-item').removeClass('active');
			$menu.addClass('active');
		}

		if( $menu.attr('id') == 'menu-search' ) {
			$('#search-list').toggle();
		}
			
	});

}



function ajaxCall( url, data ) {

	$('#loading').show();

	$.ajax({
		url: url,
		data: 'data=' + data,
		error: function( e ){
			console.log( e );
		}, 
		success: function( message ){

		}
	});

}