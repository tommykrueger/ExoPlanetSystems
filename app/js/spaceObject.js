function SpaceObject( data ) {

	this.data = data;
	this.id = data.id || Math.random() * 10000;
	this.realName = data.name;
	this.systemName = data.systemName;
	this.name = data.name.replace(/\s/g, '-');
	this.type = data.type;
	this.spectralClass = data.spec || null;

	this.radius = data.radius || Settings.radiusEarth;

	// if we have planet the values is lower than 1000 km we assume that the size is given
	// as earth value
	if( this.type == 'planet' && this.radius < 1000 ) {
		this.radius *= Settings.radiusEarth;
	}

	this.rotation = data.rotation || 0;
	this.distance = data.distance || null;

	// orbit options
	this.eccentricity = data.eccentricity || 0;
	this.semiMajorAxis = data.semiMajorAxis || 1;
	//this.semiMinorAxis = this.semiMajorAxis * Math.sqrt( 1 - Math.pow(this.eccentricity, 2) );
	this.inclination = data.inclination || 0;

	this.rotationPeriod = data.rotationPeriod || null;
	this.rotationClockwise = data.rotationClockwise;
	this.longitudeAscendingNode = data.longitudeAscendingNode || 0;

	// assumed one erath year if not given
	this.siderealOrbitPeriod = data.siderealOrbitPeriod || 365;
	
	// additional values might be used later
	this.periapsis = this.semiMajorAxis * (1 - this.eccentricity) / Settings.AU;
	this.apoapsis = this.semiMajorAxis * (1 + this.eccentricity) / Settings.AU;

	// console.log('render object name', this.name);

  this.animationFunctions = [];

  
  // object paramters
  this.orbitColor = data.orbitColor || Settings.orbitColor;
	this.isSatellite = data.isSatellite || false;

	this.parentGroup = data.parentGroup || App.scene;
	this.mesh;
	this.material;

	this.color = new THREE.Color( Settings.planets.defaultColor );

	if(data.color)
		this.color.setRGB( data.color[0], data.color[1], data.color[2] );

	// check if there was a texture given and render it
	this.texture = data.texture || false;

	// scene meshes array used for event dispatching
	this.meshes = data.meshes;

	// child objects like moons / asteroids or similar
	this.satellites = data.satellites;

	// scene orbits array
	this.orbits = data.orbits;


	// ----
	// Define 3D objects for the scene
	// ----

	// used for longitude of the ascending node
	this.referencePlane = new THREE.Object3D();

	// base plane holds the orbit ellipse and inclination
	this.basePlane = new THREE.Object3D();

	// pivot holds the planet sphere shape
  this.pivot = new THREE.Object3D();

  // planet plane is used for additional objects like moons
  // moons will be added as child objects to this group
	this.objectPlane = new THREE.Object3D();

	// sattelites are all objects below a star
	if ( this.isSatellite ) {

		this.referencePlane.add( this.basePlane );
		this.basePlane.add(this.pivot);
		this.pivot.add(this.objectPlane);
		this.parentGroup.add( this.referencePlane );

	} else {
		this.parentGroup.add( this.objectPlane );
	}

	this.renderObject();
	this.renderOrbit();
	this.prepareAnimations();

	return this.object;
}; 

SpaceObject.prototype.renderObject = function(){
	var $this = this;
	var geometry;

	if( this.type == 'star' ) {

		this.rotationPeriod = Settings.defaultStarRotationPeriod;

		// render star as geometry
		geometry = new THREE.SphereGeometry( $this.radius * Settings.radiusSun / Settings.radiusStarPixelRatio, 32, 32 );
		var material = new THREE.MeshBasicMaterial({
		  map: THREE.ImageUtils.loadTexture("img/materials/sun.jpg"),
		  shading: THREE.SmoothShading, 
		  blending: THREE.AdditiveBlending, 
		  color: 0xffffff, 
		  ambient: 0xffffff, 
		  shininess: 100
		});

		this.object = new THREE.Mesh(geometry, material);
		this.objectPlane.add( this.object );

		this.object.name = $this.name;
		this.object.properties = {
			type: 'star',
			radius: $this.radius * Settings.radiusSun / Settings.radiusPixelRatio,
			mass: $this.mass,
			texture: 'sun.jpg',
			spectralClass: $this.spectralClass.toLowerCase()
		}

		this.meshes.push( this.object );
	} 

	else {

		if( this.type == 'camera' ) {
			r = 0.01;
		}

		var geometry = new THREE.SphereGeometry( this.radius / Settings.radiusPixelRatio, 32, 32 );
		var material = new THREE.MeshLambertMaterial({ 
			color: $this.color.getHex()
		});

	  if( $this.texture ){
	  	material = new THREE.MeshLambertMaterial({
		    map: THREE.ImageUtils.loadTexture('img/materials/'+ $this.texture + ''),
		    wireframe: false  
		  });
	  };

	  this.object = new THREE.Mesh(geometry, material);
		this.object.name = $this.name;
		this.object.properties = {
			name: $this.name,
			realName: $this.realName,
			radius: $this.radius.toFixed(2),
			distance: ($this.distance * Settings.PC).toFixed(4),
			siderealOrbitPeriod: $this.siderealOrbitPeriod,
			semiMajorAxis: $this.semiMajorAxis,
			eccentricity: $this.eccentricity,
			inclination: $this.inclination,
			rotationPeriod: $this.rotationPeriod,
			image: $this.texture,
			temparature: $this.data.temp,
			masse: $this.data.masse,
			habitable: $this.data.habitable,
			esi: $this.data.esi,
			habitableMoon: $this.data.habitableMoon,
			method: $this.data.method,
			year: $this.data.year,
			type: $this.data.class,
			tempClass: $this.data.tempClass
		};

		this.object.spaceRadius = $this.radius / Settings.radiusPixelRatio;
		this.objectPlane.add(this.object);

		if( this.type != 'camera' ) {
			this.meshes.push( this.object );
		}
	}

	if( $this.type == 'planet' || $this.type == 'dwarf-planet' || $this.type == 'star' ) {
		
		// render the label as html object to prevent zooming with web gl
		var $label = $('<span class="space-label" id="object-'+ $this.name +'">'+ $this.realName +'</span>');
		$label.addClass('labelgroup-' + App.systems.length);
		$label.css({'color': '#' + Settings.orbitColors[ App.systems.length ].toString(16) });

		$label.attr('rel', $this.systemName);

		if( $this.type == 'moon' )
			$label.addClass('moon');

		if( $this.type == 'star' )
			$label.addClass('star');

		$('#labels').append( $label );	
	}

	if( $this.satellites ) {
		_.each($this.satellites, function( satellite, index ){

			satellite.parentGroup = $this.objectPlane;
			satellite.meshes = $this.meshes;
			satellite.orbits = $this.orbits;
			satellite.isSatellite = true;
			satellite.orbitColor = $this.orbitColor;
			satellite.systemName = $this.systemName;

			var object = new SpaceObject( satellite );
		});	
	}
	
};

SpaceObject.prototype.renderOrbit = function() {
  var $this = this;

  var circle = new THREE.Shape();
  //circle.moveTo(this.position[0], 0);

  if( this.eccentricity >= -1 ) {

  	// aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise
		var ellipseCurve = new THREE.EllipseCurve(
			($this.eccentricity * 100 * $this.semiMajorAxis / 100) / Settings.distancePixelRatio,
			0,
   		$this.semiMajorAxis / Settings.distancePixelRatio, 

   		// taken from http://en.wikipedia.org/wiki/Semi-minor_axis
			( $this.semiMajorAxis * Math.sqrt(1 - Math.pow($this.eccentricity, 2) ) ) / Settings.distancePixelRatio, 
    	0, 
    	2.0 * Math.PI,
    	false
    );

		var ellipseCurvePath = new THREE.CurvePath();
				ellipseCurvePath.add(ellipseCurve);

		var ellipseGeometry = ellipseCurvePath.createPointsGeometry(200);
				ellipseGeometry.computeTangents();

		var orbitMaterial = new THREE.LineBasicMaterial({
		  color: Settings.orbitColors[ App.systems.length ],
		  blending: THREE.AdditiveBlending,
		  depthTest: true,
		  depthWrite: false,
		  opacity: Settings.orbitTransparency,
			linewidth: Settings.orbitStrokeWidth,
		  transparent: true
		});

		var line = new THREE.Line(ellipseGeometry, orbitMaterial);
		line.orbitColor = Settings.orbitColors[ App.systems.length ];
		//line.orbitColorHover = Settings.Colors[ App.systems.length ].orbitHover;

		this.referencePlane.rotation.y = this.longitudeAscendingNode * Math.PI/2;

		line.rotation.set(Math.PI/2, 0, 0);

		if( this.type != 'camera' ) {
	  	this.basePlane.add(line);
	  	this.orbits.push({ 
	  		line: line ,
	  		name: $this.name, 
	  		type: $this.type
	  	});
  	}

	} else {

		// x, y, radius, start, end, anti-clockwise
		circle.absarc(0, 0, $this.semiMajorAxis / Settings.distancePixelRatio, 0, Math.PI*2, false);

		var points = circle.createPointsGeometry(128);
	  v_circle = new THREE.Line(
	  	points, 
			new THREE.LineBasicMaterial({ 
				//color: $this.orbitColor,
				color: Settings.Colors[ App.systems.length ].orbit,
				opacity: Settings.orbitTransparency,
				linewidth: Settings.orbitStrokeWidth,
				transparent: true
			})
		);

	  v_circle.rotation.set(Math.PI/2, 0, 0);
	  this.basePlane.add(v_circle);

	  this.orbits.push({ 
	  	line: v_circle,
	  	name: $this.name, 
	  	type: $this.type
	  });
	}

	this.basePlane.inclination = 1;
	this.basePlane.rendertype = 'basePlane';
	this.basePlane.rendername = this.name;

	// set the inclination
	if( this.inclination > 0 ) {
		this.basePlane.inclination = this.inclination;
		this.basePlane.rotation.set(this.inclination * Math.PI / 180.0, 0, 0);
	}
};


// Define animation functions that will be called by the render loop inside if app.js
// The functions will be invoked
SpaceObject.prototype.prepareAnimations = function() {
    var $this = this;

    // rotation of the space object
    // not all objects have self rotation, e.g. mercury and moon don't have
    // venus has a negative rotation

    $this.animationFunctions.push(function() {

    	// we have rotationPeriod in earth days
    	if( $this.rotationPeriod ) {

    		if( $this.rotationClockwise === false )
					$this.object.rotation.y -= App.currentSpeed / (24 * 60 * 60);    	
				else
					$this.object.rotation.y += App.currentSpeed / (24 * 60 * 60);    	
    	}
    });

    // planet orbit
    if ($this.pivot) {
			$this.animationFunctions.push(function() {
	    	
				if( $this.eccentricity ) {

			    var aRadius = $this.semiMajorAxis / Settings.distancePixelRatio;
			    var bRadius = aRadius * Math.sqrt(1.0 - Math.pow($this.eccentricity, 2.0));

			    // get the current angle
			    // the orbit period is always calculated in days, so here
			    // we need to change it to seconds
			    var angle = App.simTimeSecs / ($this.siderealOrbitPeriod * 24 * 60 * 60) * Math.PI*2 * -1;

			    $this.pivot.position.set(
			    	aRadius * Math.cos(angle) + ($this.eccentricity * 100 * $this.semiMajorAxis / 100) / Settings.distancePixelRatio,
			    	0,
			    	bRadius * Math.sin(angle)
			    );
				}
				else
					$this.pivot.rotation.y += 1 / $this.siderealOrbitPeriod;
			});
    };
    
    // Inject functions array
    $this.objectPlane.animate = function() {	
			$this.animationFunctions.forEach(function(dt) {
				dt();
			});
    };

};