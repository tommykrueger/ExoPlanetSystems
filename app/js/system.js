function System( scene, meshes, orbits, data ) {

	this.id = data.id || null;
	this.name = data.name;
	this.radius = data.radius || 1000;
	this.orbitColor = Settings.orbitColors[ App.systems.length ];

	this.temp = data.temp || null;
	this.luminosity = data.luminosity || null;

	// a solar system may consist of multiple stars
	this.stars = data.stars || [];
	this.satellites = data.satellites || [];
	this.meshes = meshes;
	this.orbits = orbits;

	// create the group of the star(s)
	this.group = new THREE.Object3D();

	// set initial visibility to true
	this.isVisible = true;

	//this.group.position.set(0, App.systems.length * 1000, 0);
  
  //this.showSystemPlane = data.showSystemPlane || true;

	this.renderHabitableZone();
	this.renderObjects();
	this.renderView();

	scene.add(this.group);
};

System.prototype.renderObjects = function() {
	var $this = this;

	// render the star
	$this.stars[0].parentGroup = $this.group;
	$this.stars[0].meshes = $this.meshes;
	$this.stars[0].satellites = $this.satellites;
	$this.stars[0].orbits = $this.orbits;
	$this.stars[0].systemName = $this.name;

	console.log('OrbitColor:', $this.orbitColor );
	$this.stars[0].orbitColor = $this.orbitColor;

	var star = new SpaceObject( $this.stars[0] );

	/*
	_.each(this.stars, function(star, idx){	
		var geometry = new THREE.SphereGeometry(star.radius, 32, 32);
	  var material = new THREE.MeshBasicMaterial({ 
			color: star.color, 
			wireframe: true 
		});
	        
		var s = new THREE.Mesh(geometry, material);
		s.name = star.name;
		$this.group.add( s );
		$this.meshes.push( s );
	});

	_.each(this.satellites, function(satellite, idx){
		//console.log( object );

		satellite.parentGroup = $this.group;
		satellite.meshes = $this.meshes;

		var satellite = new Object( satellite );
	});
	*/

};


System.prototype.renderHabitableZone = function() {
	var $this = this;

	//console.log( 'Star data', $this );

	// radius in sun radii
	var r = $this.stars[0].radius * Settings.radiusSun;
	var t = $this.stars[0].temp;
	var L = $this.stars[0].lum;

	// we need to check if the star has an effective temparature given
	if( !t ) {
		//var sLR = Math.pow(2, L);
		var sLR = (1 + L) + 1;
	}

	else {
		var sLR = Math.pow( (r / Settings.radiusSun), 2) * Math.pow( (t / Settings.tempSun), 4);
	}

	//console.log('Lum relation', sLR );

	// render inner boundary nad outer boundary of habitable zone
	// the habitable zone should be rendered in green

	// the hz is beeing calculated in relation to the hz of our sun.
	// star boundary = Sun boundary × Sqrt[ (star luminosity)/(Sun luminosity) ].
	// so we nee to calculate the star's luminosity first.
	// L = 4 PI r^2 BoltzmanConst T^4

	var starLuminosity = 4*Math.PI * Math.pow($this.radius, 2) * Settings.Boltzmann * Math.pow($this.temp, 4);
 	var starLuminosityRelation = Math.sqrt(starLuminosity / Settings.sunLiminosity);

 	// alternative calculation 
 	
 

	//var minHZ = sLR * Settings.minHZ;
	//var maxHZ = sLR * Settings.maxHZ;

	var minHZ = $this.stars[0].minhz;
	var maxHZ = $this.stars[0].maxhz;

	//console.log('minHz', minHZ);
	//console.log('maxHz', maxHZ);

	if( minHZ && maxHZ ) {

		var normalizedMinHZ = minHZ * Settings.AU / Settings.distancePixelRatio;
		var normalizedMaxHZ = maxHZ * Settings.AU / Settings.distancePixelRatio;

		var arcShape = new THREE.Shape();
		arcShape.moveTo( normalizedMaxHZ, 0 );
		arcShape.absarc( 0, 0, normalizedMaxHZ, 0, Math.PI*2, false );

		var holePath = new THREE.Path();
		holePath.moveTo( normalizedMinHZ, 0 );
		holePath.absarc( 0, 0, normalizedMinHZ, 0, Math.PI*2, true );
		arcShape.holes.push( holePath );

		var geometry = new THREE.ShapeGeometry( arcShape );
		/*
		var geometry = new THREE.Line( 
			arcShape.createPointsGeometry(100),
			new THREE.LineBasicMaterial({ color: 0x00ff00, opacity: 0.5 }) 
		);
		*/

		//$this.group.add( geometry );


		var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ 
				color: Settings.habitableZoneColor,
				transparent: true,
				opacity: 0.35,
				side: THREE.DoubleSide
			})
		);

		mesh.position.set(0, App.systems.length, 0);
		mesh.rotation.set( -90 * Math.PI / 180, 0, 0 );
		//mesh.scale.set(1, 1, 1);

		mesh.visible = Settings.filters.habitableZones;

		$this.group.add( mesh );
		App.habitableZones.push( mesh );

		/*
		var smooth = geometry.clone();
    smooth.mergeVertices(); 
		var modifier = new THREE.SubdivisionModifier( 2 );
   	modifier.modify( geometry );
    //modifier.modify( smooth );
    */
	}
};


System.prototype.renderView = function(){
	var $this = this;
	new SystemView($this);
}


