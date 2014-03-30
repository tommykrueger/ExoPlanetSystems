var App = {};

App.init = function(){

	this.scene;
	this.renderer;
	this.camera; 
	this.cameraControls;
	this.controls;
	this.projector;
	this.trackingOrbit = null;

	this.meshes = [];
	this.materials = [];
	this.systems = [];
	this.orbits = [];
	this.labels = [];
	this.stars = [];
	this.loadedStars = [];
	this.particleSystems = [];
	this.starLines = [];
	this.markers = [];
	this.currentStar = {};

	this.habitableZones = [];
	this.gridPlane;

	this.starLinesRendered = false;

	this.distanceObjects = {
		'au': [],
		'lightyears': []
	};

	// amount of loops to quit certain code part
	this.allowedRenderLoops = 10;
	this.currentRenderLoops = 0;

	// used for changing simulation speed
	this.time = Date.now();
	this.simTime = this.time;
	this.simTimeSecs = null;

	this.defaultSpeed = 100;

	// current speed (1 earth day represents 365/100 seconds in app)	
	this.currentSpeed = 100;
	this.speedStep = 100;

	this.date = new Date( this.simTime );

	this.interestingSystems = [
		'47 uma.json',
		'55 cnc.json',
		'gl 581.json',
		'gj 667c.json',
		'gliese 867.json',
		'kepler-62.json',
		'kepler-90.json'
	];

	if( Detector.webgl ){

		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			preserveDrawingBuffer: true	// to allow screenshot
		});

		this.renderer.setClearColor( 0x000000, 1 );
	} else{
		console.log( Detector.addGetWebGLMessage() );
		this.renderer = new THREE.CanvasRenderer();
	}

	this.renderer.setSize( window.innerWidth, window.innerHeight );
	this.renderer.shadowMapEnabled = true;
	this.container = document.getElementById('container');
	this.container.appendChild(this.renderer.domElement);

	Utils.renderStats();

	// create a scene
	this.scene = new THREE.Scene();

	// put a camera in the scene
	this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, Settings.LY );

	this.camera.position.set(
		Settings.AU / Settings.distancePixelRatio, 
		Settings.AU / Settings.distancePixelRatio, 
		Settings.AU / Settings.distancePixelRatio
	);

	this.scene.add(this.camera);

	this.orbitCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, Settings.LY );
	this.scene.add(this.orbitCamera);


	// create a point light
  this.pointLight = new THREE.PointLight(0xFFFFFF, 1);

  // set its position
  this.pointLight.position.set(0, 0, 0);

  // add to the scene
  this.scene.add( this.pointLight );


  // add a very light ambient light
  var globalLight = new THREE.AmbientLight(0xccffcc);
  globalLight.color.setRGB( 
  	Settings.globalLightIntensity,
  	Settings.globalLightIntensity,
  	Settings.globalLightIntensity
  );

  this.scene.add( globalLight );

	// create a camera contol
	//this.cameraControls = new THREEx.DragPanControls(this.camera);

	this.controls = new THREE.TrackballControls( this.camera, this.container );
  this.controls.rotateSpeed = 1.0;
  this.controls.zoomSpeed = 1.2;
  this.controls.panSpeed = 0.8;

  this.controls.noZoom = false;
  this.controls.noPan = false;

  this.controls.staticMoving = true;
  this.controls.dynamicDampingFactor = 0.3;

  this.controls.keys = [ 65, 83, 68 ];
  this.controls.addEventListener( 'change', this.render.bind(this) );

	/*
	controls = new THREE.OrbitControls( camera );
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.1;
  controls.addEventListener( 'change', render );
	*/

	// transparently support window resize
	THREEx.WindowResize.bind(this.renderer, this.camera);

	// allow 'p' to make screenshot
	//THREEx.Screenshot.bindKey(this.renderer);
		
	// allow 'f' to go fullscreen where this feature is supported
	/*
	if( THREEx.FullScreen.available() ){
		THREEx.FullScreen.bindKey();		
		document.getElementById('inlineDoc').innerHTML	+= "- <i>f</i> for fullscreen";
	}
	*/

  this.projector = new THREE.Projector();

  // add event listeners
  document.addEventListener( 'mousedown', this.onDocumentMouseDown.bind(this), false );
  document.addEventListener( 'mousemove', this.onDocumentMouseMove.bind(this), false );
  document.addEventListener( 'mouseover', this.onDocumentMouseMove.bind(this), false );

  this.animate();
  this.createSystem();

  // render all stars that have at least one planet nad make them markable
  this.renderStars();
  this.renderSystemPlane();

  // render on the basis of 10 (10AU, 100AU, 1000AU, etc.)
  this.renderDistanceCircles(5, 'au');
	this.renderDistanceCircles(5, 'lightyears');
};

App.animate = function() {

	// loop on request animation loop
	// - it has to be at the begining of the function
	// - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	requestAnimationFrame( this.animate.bind( this ) );
	this.controls.update();

	if(this.systems.length > 0) {

		_.each( this.systems, function( system, index ){
			system.group.traverse(function(child) { 
		    if (child.animate)
					child.animate();
			});
		});
  }

  // set the time
  this.lastTime = this.time;
  this.time = Date.now();
  this.dt = this.time - this.lastTime;
  this.simTime += this.dt * this.currentSpeed;
  this.date = new Date(this.simTime);
  this.simTimeSecs = this.simTime;

	// do the render
	this.render();

	// update stats
	Utils.stats.update();
};

App.render = function(){
	var $this = this;

	this.currentRenderLoops++;

	// calculate current distance from solar center
	var cameraPos = new THREE.Vector3();
	var cameraPos = cameraPos.getPositionFromMatrix( this.camera.matrixWorld );

	// distance in px
	var distanceCamera = cameraPos.distanceTo( new THREE.Vector3() );
	var distanceSolarCenter = distanceCamera * Settings.distancePixelRatio;

	var distanceAU = parseFloat(distanceSolarCenter / Settings.AU).toFixed(2);
	var distanceLY = parseFloat(distanceSolarCenter / Settings.LY).toFixed(5);
	var distancePC = parseFloat(distanceLY / Settings.PC).toFixed(5);

	distanceSolarCenter = Utils.numberFormat( distanceCamera * Settings.distancePixelRatio );

	$('#distance-solar-center').text(distanceSolarCenter);
	$('#distance-au').text(distanceAU);
	$('#distance-ly').text(distanceLY);
	$('#distance-pc').text(distancePC);

	// show or hide the related distance rings
	_.each( this.distanceObjects, function( objects, type ){

		if( type == 'au' ) {
			_.each( objects, function( object, idx ){
				if( object.properties.distanceScale <= distanceAU && Settings.showDistances )
					object.visible = true;

				else if( object.properties.distanceScale )
					object.visible = false;	
			});

		}

		if( type == 'lightyears') {
			_.each( objects, function( object, idx ){
				if( object.properties.distanceScale <= distanceLY && Settings.showDistances )
					object.visible = true;

				else if( object.properties.distanceScale )
					object.visible = false;	
			});
		}
	});



	// toggle star lines if the user zooms out more than 10 lightyears
	if( distanceLY >= 10 ) {
			
		if( this.currentRenderLoops <= 5 ) {
			console.log('showing star lines for orientation');

			// go through all particle systems of stars
			// get the star position
			// draw a tiny line from star position to ecliptic (y = 0);

			var material = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.05
   		});

			_.each( this.stars, function( star, idx ) {

				var geometry = new THREE.Geometry();
				    geometry.vertices.push(new THREE.Vector3(star.x, star.y, star.z));
				    geometry.vertices.push(new THREE.Vector3(star.x, 0, star.z));
	
				var starLine = new THREE.Line(geometry, material);

				$this.starLines.push( starLine );
			});			
		}
		
	}


	// bind the camera to an object and track its orbit
	if( this.trackingOrbit !== null ) {

		// we bind the camera to an orbit which has similar properties
		// like the on we ar tracking.
		// the camera orbit then moved a certain distance
		$this.scene.updateMatrixWorld(true);

		var pos = this.trackingOrbit.parent.parent.position;
		position = new THREE.Vector3();
		pos = position.getPositionFromMatrix( this.trackingOrbit.matrixWorld );

		// move the camera to the specific space object
		//if( c % 100 == 0 )
			//this.camera.lookAt( pos );
		//this.camera.lookAt( new THREE.Vector3(0,0,0) );

		//if( c < 1000 )
			//console.log(pos);

		var newX = pos.x;// + this.trackingOrbit.spaceRadius * 4;
		var newY = pos.y;// + 0;
		var newZ = pos.z;// + this.trackingOrbit.spaceRadius * 4;

		// move the camera to the object
		//this.camera.position.x = newX;
		//this.camera.position.y = newY;
		//this.camera.position.z = newZ;
	}

	// update label positions
	_.each(this.meshes, function( mesh, idx ) {

		//var pos = Utils.getPosition2D( mesh.parent.parent, $this.camera, $this.projector);
		var pos = Utils.project2D( mesh, $this );

		$('#object-' + mesh.name).html( mesh.name );
		$('#object-' + mesh.name).css({
			'left': pos.x + Settings.labelOffsetX + 'px',
			'top': pos.y + Settings.labelOffsetY + 'px',
		});

	});	

	// render the scene
	//this.renderer.render( this.scene, this.trackingOrbit == true ? this.orbitCamera : this.camera );
	this.renderer.render( this.scene, this.camera );
};

App.createSystem = function(){
	var $this = this;

	// add the solar sytem to the scene
	this.system = new System( this.scene, this.meshes, this.orbits, solarsystem );
	this.systems.push( this.system );

	// load anoth particular system randomly
	var randomSystem = this.interestingSystems[ 
		Math.round(Math.random() * (this.interestingSystems.length-1)) 
	];

	// load planet systems dynamically
	/*
	setTimeout(function(){
		$.ajax({
		  dataType: "json",
		  url: 'js/data/planetsystems/' + randomSystem,
		  success: function( data ) {

		  	$this.system = new System( $this.scene, $this.meshes, $this.orbits, data );
				$this.systems.push( $this.system );
		  }
		});
	}, 1000);
	*/

};


App.addSystem = function( hostname ){
	var $this = this;
	var systemRendered = false;

	// check if system already loaded
	_.each( this.systems, function( system, idx ){
		if( system.name.toLowerCase() == hostname ) {
			console.log('system already rendered');
			systemRendered = true;
		}
	});

	if( !systemRendered ) {

		// load another planet system
		$.ajax({
		  dataType: "json",
		  url: 'js/data/planetsystems/'+ hostname +'.json',
		  success: function( data ){
		  	
		  	$this.system = new System( $this.scene, $this.meshes, $this.orbits, data );
				$this.systems.push( $this.system );
		  }
		});
	}

};


App.renderStars = function(){
	var $this = this;

	$.ajax({
	  dataType: "json",
	  url: 'js/data/stars.json',
	  success: function( stars ){
	  	
	  	$this.loadedStars = stars;
	  	console.log('stars loaded: ', stars.length );
	  	new ParticleStars( $this, $this.loadedStars );
	  }
	});

};


App.renderSystemPlane = function() {
  var $this = this;

  var gridPlaneGroup = new THREE.Object3D();

  var material = new THREE.LineBasicMaterial({
    color: 0xffffff,
		opacity : 0.15,
		transparent: true
  });

  var geometry = new THREE.Geometry();
  geometry.vertices.push( new THREE.Vector3(0, 0, 0) );

  // make the size 100 AU
  geometry.vertices.push( new THREE.Vector3( (Settings.AU * 100 / Settings.distancePixelRatio), 0, 0) );

  var axisNumber = 25;

  for (var i = 0; i < axisNumber; i++) {
  	var line = new THREE.Line(geometry, material);
  	//line.position.set(0, -100, 0);	
  	line.position.set(0, 0, 0);	
  	line.rotation.set(0, (i * Math.PI) / (axisNumber / 2), 0);
  	gridPlaneGroup.add(line);
  }

  var ringsNumber = 100;
  var circleDistance = (Settings.AU * 100 / Settings.distancePixelRatio) / ringsNumber;
  
  for (var i = 0; i < ringsNumber + 1; i++) {

		//circles
		var circle = new THREE.Shape();
		circle.moveTo(circleDistance * i, 0 );
		circle.absarc( 0, 0, i * circleDistance, 0, Math.PI*2, false );
		
		var points = circle.createPointsGeometry(100);
		circleLine = new THREE.Line(points, 
		  new THREE.LineBasicMaterial({ 
	      color : 0xeeeeee,
	      opacity : 0.15,
	      linewidth: 1,
	      transparent: true
		  })
		);
		
		// add one AU as offset to move it to the center		
		//v_circle.position.set(0, -100, 0);		
		circleLine.position.set(0, 0, 0);
		circleLine.rotation.set(Math.PI/2, 0, 0);

		gridPlaneGroup.add( circleLine );	
  }

  this.scene.add( gridPlaneGroup );
  this.gridPlane = gridPlaneGroup;

};


App.renderDistanceCircles = function(limit, type){
	var $this = this;

	var object = new THREE.Object3D();
  var distanceType = Settings.AU;

  if( type == 'lightyears' )
  	distanceType = Settings.LY;
  
  // make the steps every 10^x circles
	for( var i=0; i<5; i++ ) {

		var circleDistance = Math.pow( 10, i ) * (distanceType / Settings.distancePixelRatio);
		var distanceStep = Math.pow( 10, i );

		var circle = new THREE.Shape();
				circle.moveTo( circleDistance, 0 );
				circle.absarc( 0, 0, circleDistance, 0, Math.PI*2, false );
		
		var points = circle.createPointsGeometry(100);

		circleLine = new THREE.Line(points, 
		  new THREE.LineBasicMaterial({ 
	      color : 0x6060ff,
	      opacity : 0.5,
	      linewidth: 1,
	      transparent: true
		  })
		);
		
		// add one distanceStep as offset to move it to the center		
		//v_circle.position.set(0, -100, 0);		
		circleLine.position.set( 0, 0, 0 );
		circleLine.rotation.set( Math.PI/2, 0, 0 );
		circleLine.visible = false;
		circleLine.properties = {};
		circleLine.properties.distanceScale = distanceStep;

		$this.distanceObjects[ type ].push( circleLine );
		object.add( circleLine );	

		// for every distance create a canvas text based on a three texture
   	var canvas = document.createElement('canvas');
   			canvas.width = 600;
    		canvas.height = 400;

    var context = canvas.getContext('2d'),
	      centerX = canvas.width / 2,
	      centerY = canvas.height / 2,
	      angle = (Math.PI * 0.7),
	      radius = -520;

    //context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '32px Calibri';
    context.textAlign = 'center';
    context.fillStyle = '#6060ff';
    context.strokeStyle = '#6060ff';
    context.lineWidth = 4;

    var canvasText = distanceStep + ' astronomical unit';
 
	  if( type == 'lightyears' )
	  	canvasText = distanceStep + ' light year';

	  if( i > 0 ) 
	  	canvasText += 's';

    Utils.textCircle(context, canvasText, centerX, centerY-480, radius, angle, 1);
    context.stroke();

    // taken from: http://stemkoski.github.io/Three.js/Texture-From-Canvas.html
		// canvas contents will be used for a texture
		var texture = new THREE.Texture(canvas); 
				texture.needsUpdate = true;
	      
  	var material = new THREE.MeshBasicMaterial({
  		map: texture, 
  		color: 0x6060ff, 
  		transparent: true,
  		opacity: 0.75,
  		side:THREE.DoubleSide 
  	});

    material.transparent = true;

    var mesh = new THREE.Mesh(
    	new THREE.PlaneGeometry(100, 100),
   		material
   	);

    mesh.properties = {};
    mesh.properties.distanceScale = distanceStep;
    mesh.visible = false;
		mesh.position.set(0, 0, circleDistance);
		mesh.rotation.set(-Math.PI/2, 0, 0);

		mesh.scale.x = 10.0 * ( Math.pow( 10, (i+1) ) );
		mesh.scale.y = 10.0 * ( Math.pow( 10, (i+1) ) );

		if( type == 'lightyears' ) {
			mesh.scale.x = 7.0 * ( Math.pow( 10, (i+6) ) );
			mesh.scale.y = 7.0 * ( Math.pow( 10, (i+6) ) );
		}

		this.distanceObjects[ type ].push( mesh );
		this.scene.add( mesh );
	}

	this.scene.add( object );
}

// bind the camera to an object and try to orbit it around it
App.bindCamera = function( objectID ){
	var $this = this;

	_.each( this.meshes, function( mesh, idx ){

		if( mesh.name == objectID ) {
			console.log('binding camera to object ' + mesh.name);

			$this.trackingOrbit = mesh;

			var tOrbit = {};
			tOrbit = mesh.properties;
			tOrbit.type = 'camera';
			tOrbit.name = 'Tracking Orbit';

			// change the radius
			tOrbit.semiMajorAxis += (tOrbit.radius * 4) * 15;

			var cameraOrbit = new THREE.Object3D();
			tOrbit.parentGroup = App.systems[0].group;
			tOrbit.meshes = App.meshes;
			tOrbit.orbits = App.orbits;
			tOrbit.isSatellite = true;

			$this.controls = new THREE.OrbitControls( $this.camera, $this.container );
			$this.trackingOrbit = new SpaceObject(tOrbit);

			console.log('orbit planet radius: ', tOrbit.radius );
			console.log( $this.camera );
		}

	});
};


App.moveCamera = function( settings ){

	this.camera.position.set(
		settings.position.x,
		settings.position.y,
		settings.position.z
	);

	this.camera.lookAt( new THREE.Vector3(0,0,0) );

	if( settings.lookAt ) {
		// todo if camera doesn't look at the center of the scene (0,0,0)
	}

	this.trackingOrbit = null;
};


// EVENTS

App.onDocumentMouseDown = function( event ) {
	event.preventDefault();

	var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
	this.projector.unprojectVector( vector, this.camera );

	var rayCaster = new THREE.Raycaster( this.camera.position, vector.sub( this.camera.position ).normalize() );
	var intersects = rayCaster.intersectObjects( this.meshes );

	if ( intersects.length > 0 ) {

		console.log( 'hovered', intersects[ 0 ].object );
		// intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );

		var particle = new THREE.Particle();
		particle.position = intersects[ 0 ].point;
		particle.scale.x = particle.scale.y = 8;
		this.scene.add( particle );
		//console.log( intersects[ 0 ].object.parent.parent.position );


		this.trackingOrbit = intersects[ 0 ].object;

		//console.log( intersects[ 0 ].object.parent.parent.position );

		// move the camera to the specific space object
		//this.camera.lookAt( intersects[ 0 ].object.position );

		// move the camera to the object
		//this.camera.position.x = intersects[ 0 ].object.parent.position.x;
		//this.camera.position.y = intersects[ 0 ].object.parent.position.y;
		//this.camera.position.z = intersects[ 0 ].object.parent.position.z;

		//this.fixCameraToObject = true;
	}
};


App.onDocumentMouseMove = function( event ) {
	event.preventDefault();

	var $this = this;

	var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, .5 );
	this.projector.unprojectVector( vector, this.camera );

	var rayCaster = new THREE.Raycaster( this.camera.position, vector.sub( this.camera.position ).normalize() );

	$('#tooltip').remove();
	_.each( $this.markers, function( marker, idx ){
		$this.scene.remove( marker );
	});

	var intersects = rayCaster.intersectObjects( this.meshes, true );
	var mouse = { x: 0, y: 0, z: 1 };

	//this where begin to transform the mouse cordinates to three,js cordinates
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    //this vector caries the mouse click cordinates
  var mouse_vector = new THREE.Vector3(0,0,0);
  mouse_vector.set( mouse.x, mouse.y, mouse.z );

  this.projector.unprojectVector( mouse_vector, this.camera );

  var direction = mouse_vector.sub( this.camera.position ).normalize();
  
  rayCaster.set( this.camera.position, direction );
    
  
	// check if the user moves the mouse over a planet or host star
	_.each( this.meshes, function( mesh, idx ){
		//console.log(mesh);
		if( mesh.position ) {
			intersects = rayCaster.intersectObject( [mesh] );

			if( intersects.length > 0 ) {
  			console.log( intersects[ 0 ].object );
  		}
		}
	});

	$('#canvas').css({'opacity': 0.0});

	if( Settings.showStars ) {

		// check if user moves the mouse near a star
		_.each( this.stars, function( star, idx ){
			star.position = star;

			var pos = Utils.getPosition2D( star, $this.camera, $this.projector);

			if( pos.x >= (event.clientX - 3) && pos.x <= (event.clientX + 3) ) {

				if( pos.y >= (event.clientY - 3) && pos.y <= (event.clientY + 3) ) {

					var tooltipView = new TooltipView( event, star );

					// render a canvas circle at the screen position
			   	$this.canvas = document.getElementById('canvas');
					$this.canvas.width = 24;
					$this.canvas.height = 24;
					$this.currentStar.properties = star.properties;

					var context = $this.canvas.getContext('2d');
					context.beginPath();
		      context.arc(12, 12, 11, 0, 2 * Math.PI, false);
		      context.lineWidth = 2;
		      context.strokeStyle = '#ff0000';
		      context.stroke();

		      $('#canvas').css({
		      	'left': pos.x - 12 + 'px',
		      	'top': pos.y - 12 + 'px',
		      	'opacity': 1.0
		      });

				}
			}
		});

	}

};




