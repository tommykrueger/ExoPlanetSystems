var PopupView = {
	
	el: '#popup',
	renderers: []
};

// render the view to the screen
PopupView.init = function( object, type, html, ajaxUrl, cssOptions ) {
	
	// add some basic information to the screen
	var $popup = $('<div id="popup"></div>');
	$popup.append( $('<span id="close-btn"> &times; </span>') );

	var $popupContent = $('<div id="popup-content"></div>');
	$popup.append( $popupContent );

	if( cssOptions ) {
		$popup.css( cssOptions );
	}
	
	var $this = this;

	if( html ) {
		$popupContent.append( html );
		$('body').append( $popup );
	}

	// load the content from ajax call if there is a url given
	if( ajaxUrl ) {
		$.ajax({
			url: 'js/templates/' + ajaxUrl,
			dataType: 'html',
			success: function( data ){
				$popupContent.append( data );
				$('body').append( $popup );				
			}		
		});
	} else {

		console.log('object', type);

		if( type == 'compare-stars' ) {

			var maxRadius = 0;
			var objects = [];
			var objectsSorted = [];
			var objectsElements = [];
			var radiusFactor = 1.0;

			// compare stars by size (mass, distance from sun, spectral type, )
			_.each( object, function( mesh, index ) {

				var properties = mesh.properties;

				if( properties.type == 'star' ) {
					console.log( properties );

					if( maxRadius < properties.radius )
						maxRadius = properties.radius;

					objects.push( mesh );
				}

			});	

			objectsSorted = _.sortBy( objects, function( obj ){ 
				return +obj.properties.radius 
			});

			var maxRadius = _.max( objects, function(o){
				return o.properties.radius;
			});

			console.log( objectsSorted );
			console.log('max radius', (maxRadius.properties.radius) );

			if( maxRadius.properties.radius > 100 ) {
				radiusFactor = 100 / (maxRadius.properties.radius);
			}

			console.log('factor', radiusFactor);


			_.each( objectsSorted, function( obj, index ) {

				//console.log( planet );
				objects.push( obj );

				planetCanvas = document.createElement('canvas');
				planetCanvas.width = 200;
				planetCanvas.height = 200;

				var context = planetCanvas.getContext('2d');
				
				//context.webkitImageSmoothingEnabled = true;

				context.beginPath();
	      context.arc(
	      	planetCanvas.width/2, 
	      	planetCanvas.height/2, 
	      	obj.properties.radius * radiusFactor, 
	      	0, 
	      	2 * Math.PI, 
	      	false
	      );
	      context.clip();

	      var grd = context.createRadialGradient(
	      	planetCanvas.width/2,
	      	planetCanvas.height/2,
	      	1, 
	      	100,
	      	100,
	      	obj.properties.radius * radiusFactor
	      );

	      var spectralColor = Settings.spectralColors[ obj.properties.spectralClass ];
	      	
	      if( spectralColor ) {
	      	spectralColor = spectralColor.toString(16);
	      	var rgb = Utils.hexToRGB( spectralColor );

	      }

	      console.log( rgb );

	      var lightRGB = {
	      	r: rgb.r + 50,
	      	g: rgb.g + 50,
	      	b: rgb.b + 50
	      }

				grd.addColorStop(0, 'rgba('+ rgb.r +','+ rgb.g +','+ rgb.b +', 1.0)' );
				grd.addColorStop(0.85, 'rgba('+ rgb.r +','+ rgb.g +','+ rgb.b +', 0.85)' );
				grd.addColorStop(1.0, 'rgba('+ lightRGB.r +','+ lightRGB.g +','+ lightRGB.b +', 0.05)' );

				// Fill with gradient
				context.fillStyle = grd;
				context.fill();
				//context.fillRect(10,10,150,100);
				
				/*
	      var img = new Image();
				img.addEventListener('load', function(e) {

					var imgCanvas = document.createElement('canvas');
							imgCanvas.width = img.width;
							imgCanvas.height = img.height;

        	var imgContext = imgCanvas.getContext('2d');
        	var counter = 0; 
        	var rgb = { r:0, g:0, b:0 }; 

        	imgContext.drawImage(img, 0, 0);
        	imgData = imgContext.getImageData(0, 0, img.width, img.height);

        	length = imgData.data.length;
        	console.log( length );

			    for(var i = 0; i < imgData.data.length; i += 4) {
		        counter++;
		        rgb.r += imgData.data[ i ];
		        rgb.g += imgData.data[ i+1 ];
		        rgb.b += imgData.data[ i+2 ];
			    }

			    rgb.r = Math.round( rgb.r / counter );
			    rgb.g = Math.round( rgb.g / counter );
			    rgb.b = Math.round( rgb.b / counter );

					context.fillStyle = 'rgb('+ rgb.r +', '+ rgb.g +', '+ rgb.b +')';
	      	context.fill();

	      	// set the stroke color to a lighter color
	      	strokeRed = rgb.r + 100;
			    strokeGreen = rgb.g + 100;
			    strokeBlue = rgb.b + 100;

	      	context.lineWidth = 1.2;
		      context.strokeStyle = 'rgba('+ strokeRed +', '+ strokeGreen +', '+ strokeBlue +', 0.5)';
		      context.stroke();

				}, true);

				img.src = 'img/materials/' + obj.properties.texture;
				*/

				objectsElements.push( planetCanvas );
				var $div = $('<div class="star"></div>');
				$div.append( planetCanvas );
				$div.append('<span id="object-'+ obj.name.replace(/\s/g, '-') +'">'+ obj.name +'</span>');
				$popupContent.append( $div );
			});

			$('body').append( $popup );


		}


		// STEPS:
		// 1. sort planets by size
		// get the largest planet and use it as the maximum (eg: jupiter => 128px)
		// render each planet as canvas circle object with given texture

		if( type == 'compare-planets' ) {
			//console.log('object', object);

			var maxRadius = 0;
			var planets = [];
			var planetsSorted = [];
			var planetsElements = [];
			var radiusFactor = 1.0;

			_.each( object, function( system, index ) {
				// console.log(system);

				var radius = _.max(system.satellites, function(o){
					if( o.radius < 250 )
						o.radius *= Settings.radiusEarth;

					return o.radius;
				});

				if( maxRadius < radius )
					maxRadius = radius;

				_.each( system.satellites, function( planet, index ) {

					if( planet.type == 'planet' )
						planets.push( planet );
				});

			});

			
			planetsSorted = _.sortBy( planets, function( planet ){ 
				return +planet.radius 
			});

			var maxRadius = _.max( planets, function(o){
				return o.radius;
			});

			console.log( planetsSorted );
			console.log('max radius', (maxRadius.radius / Settings.radiusPixelRatio) );

			if( maxRadius.radius > 100 ) {
				radiusFactor = 100 / (maxRadius.radius / Settings.radiusPixelRatio);
			}

			console.log('factor', radiusFactor);

			_.each( planetsSorted, function( planet, index ) {

				//console.log( planet );
				planets.push( planet );

				if( planet.radius <= 250 )
					planet.radius *= Settings.radiusEarth; 

				planetCanvas = document.createElement('canvas');
				planetCanvas.width = 200;
				planetCanvas.height = 200;

				var context = planetCanvas.getContext('2d');
				
				//context.webkitImageSmoothingEnabled = true;

				context.beginPath();
	      context.arc(
	      	planetCanvas.width/2, 
	      	planetCanvas.height/2, 
	      	planet.radius / Settings.radiusPixelRatio * radiusFactor, 
	      	0, 
	      	2 * Math.PI, 
	      	false
	      );
	      //context.clip();

	      var img = new Image();
				img.addEventListener('load', function(e) {

					var imgCanvas = document.createElement('canvas');
							imgCanvas.width = img.width;
							imgCanvas.height = img.height;

        	var imgContext = imgCanvas.getContext('2d');
        	var counter = 0; 
        	var rgb = { r:0, g:0, b:0 }; 

        	imgContext.drawImage(img, 0, 0);
        	imgData = imgContext.getImageData(0, 0, img.width, img.height);

        	length = imgData.data.length;

			    for(var i = 0; i < imgData.data.length; i += 4) {
		        counter++;
		        rgb.r += imgData.data[ i ];
		        rgb.g += imgData.data[ i+1 ];
		        rgb.b += imgData.data[ i+2 ];
			    }

			    rgb.r = Math.round( rgb.r / counter );
			    rgb.g = Math.round( rgb.g / counter );
			    rgb.b = Math.round( rgb.b / counter );

					context.fillStyle = 'rgb('+ rgb.r +', '+ rgb.g +', '+ rgb.b +')';
	      	context.fill();

	      	// set the stroke color to a lighter color
	      	strokeRed = rgb.r + 100;
			    strokeGreen = rgb.g + 100;
			    strokeBlue = rgb.b + 100;

	      	context.lineWidth = 1.2;
		      context.strokeStyle = 'rgba('+ strokeRed +', '+ strokeGreen +', '+ strokeBlue +', 0.5)';
		      context.stroke();

				}, true);

				img.src = 'img/materials/' + planet.texture;

	      
	      

				planetsElements.push( planetCanvas );
				var $div = $('<div class="planet"></div>');
				$div.append( planetCanvas );
				$div.append('<span id="object-'+ planet.name.replace(/\s/g, '-') +'">'+ planet.name +'</span>');
				$popupContent.append( $div );
			});

			$('body').append( $popup );

				/*
				// we create a simple canvas scene to add the planets
				var renderer = new THREE.WebGLRenderer({antialias	: true});
				var container = document.createElement('canvas');
	      renderer.setSize( $('#popup-content').width(), 200 );

	      // camera
	      var camera = new THREE.OrthographicCamera( $('#popup-content').width() / - 2, $('#popup-content').width() / 2, 200 / 2, 200 / - 2, 1, 10000 );
				//var camera = new THREE.PerspectiveCamera(90, $('#popup-content').width() / 200, 1, 1000);
		  	camera.position.z = 5000;

		  	$('#popup-content').append(renderer.domElement);
		  	var scene = new THREE.Scene();
		  	//$('#popup-content').append( container );

		  	// add a very light ambient light
			  var globalLight = new THREE.AmbientLight(0xffffff);
			  globalLight.color.setRGB( 
			  	Settings.globalLightIntensity,
			  	Settings.globalLightIntensity,
			  	Settings.globalLightIntensity
			  );

			  var planets = [];

				//scene.add( globalLight );
				
				pointLight = new THREE.PointLight(0xFFFFFF, 1);
			  pointLight.castShadow = true;

			  // set its position
			  pointLight.position.x = 1010;
			  pointLight.position.y = 1050;
			  pointLight.position.z = 2030;
			  //pointLight.position.set(0, 0, -5000);
			  //pointLight.position.x = 1000;
			  //pointLight.position.x = 1000;

			  // add to the scene
			  scene.add( pointLight );

			  controls = new THREE.TrackballControls( camera, container );
			  controls.rotateSpeed = 1.0;
			  controls.zoomSpeed = 1.2;
			  controls.panSpeed = 0.8;

			  controls.noZoom = false;
			  controls.noPan = false;

			  controls.staticMoving = true;
			  this.controls.dynamicDampingFactor = 0.3;

			  controls.keys = [ 65, 83, 68 ];
			  controls.addEventListener('change', render.bind(this));

			  var xOffset = -$('#popup-content').width()/2;

			  animate();

	      function animate(){
	      	requestAnimationFrame( animate );

	      	_.each(planets, function(planet){
	      		planet.rotation.y += 0.005;	
	      	});

	      	controls.update();
	      	render();
	      }

	      function render(){
	      	renderer.render( scene, camera );
	      }

				_.each( system.satellites, function( planet, idx ){

					//console.log( planet );

					$listItem = $('<li></li>');
					$listItem.attr('id', planet.name);

					// create planet image depending on given texture or estimated
					//$listItem.attr('id', planet.name);
					var r = (planet.radius * 3) / Settings.radiusPixelRatio;

					if( planet.radius < 1000 ) {
						r = (planet.radius * Settings.radiusEarth * 3) / Settings.radiusPixelRatio
					}
					
		      var material = new THREE.MeshPhongMaterial({
		      	color: 0x00ff40,
		      	ambient: 0xffffff,
					 	specular: 0x090909,
						shininess: 50
					});

		      if( planet.texture ) {

		      	/*
		      	material = new THREE.MeshPhongMaterial( { 
					    map: THREE.ImageUtils.loadTexture('img/materials/' + planet.texture, {}, function(){
								renderer.render(scene, camera);			
							}),
					    ambient: 0xffffff,
					    specular: 0x090909,
					    shininess: 50
						}); 
						*/
		      	/*
	      		material = new THREE.MeshBasicMaterial({
					    map: THREE.ImageUtils.loadTexture('img/materials/' + planet.texture, {}, function(){
					    	renderer.render(scene, camera);			
					    }),
					    wireframe: false  
					  });
					  
						
					}

		      var sphere = new THREE.Mesh(
		      	new THREE.SphereGeometry(r, 100, 100), 
		      	material
		      );

		      planets.push( sphere );

		      console.log('xOffset', xOffset);
		      sphere.position.set(xOffset+r, 0, 0);
		      xOffset += ( parseInt(r)*2 );

		      sphere.overdraw = true;
		      scene.add(sphere);

		      $listItem.append('<span>'+ planet.name +'</span>');
					$list.append( $listItem );
				});

				$popupContent.append( $list );
			});

			$('body').append( $popup );

			*/

		}

	}


	// EVENTS
	$(document).on('click', '#close-btn', function(){
		_.each( PopupView.renderers, function(r){
			r.cleanup();
		});

		$('#popup').empty();
		$('#popup').remove();
	});

};