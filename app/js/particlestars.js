function ParticleStars( app, stars ) {
	var $this = this;

	this.app = app;
	this.app.stars = [];
	this.stars = stars;
	this.spectralStars = {
		'o': [],
		'b': [],
		'a': [],
		'f': [],
		'g': [],
		'k': [],
		'm': [],
		'l': [],
		't': [],
		'y': []
	};

	// every spectral class needs its own particle system that ar saved 
	// to a group
	// multiple textures / colors in one particlesystem is not yet possible with three.js
	this.particleSystems = new THREE.Object3D();

	// particleTexture = THREE.ImageUtils.loadTexture('img/star-m.png');
	// particleTexture.needsUpdate = true;

	// separate the stars by spectral type
	_.each( this.stars, function( star ){
		var spectralType = star.type.substr(0, 1).toLowerCase().toString();

		if( $this.spectralStars[spectralType] )
			$this.spectralStars[spectralType].push( star );
	});

	// console.log( this.spectralStars );
	
	// render the stars as light sources
	_.each( this.spectralStars, function( stars, spectralClass ){

		$this.particles = new THREE.Geometry();
		$this.material = new THREE.ParticleBasicMaterial({
		  // map: particleTexture,
		  color: Settings.spectralColors[ spectralClass ],
		  size: 100
		});

		_.each( stars, function( star, idx ) {

			// star distance in parsec 
			// right acsession in h 
			// declination in h 
 
			// change distance to light years
			var distance = star.dist * Settings.PC * Settings.LY / Settings.distancePixelRatio;
			var distanceLY = star.dist * Settings.PC;
			// make every star the same distance from the center to make them visible
			var normalizedDistance = Settings.LY / Settings.distancePixelRatio;

			// for each particle set the space position depending on its distance, right acsession and declination
			// taken from http://www.stjarnhimlen.se/comp/tutorial.html
			var x = distance * Math.cos( star.ra ) * Math.cos( star.dec );
	  	var y = distance * Math.sin( star.ra ) * Math.cos( star.dec );
	  	var z = distance * Math.sin( star.dec );

	  	// var geometry = new THREE.SphereGeometry( 120, 12, 12 );


	  	// check star conditions
	  	if( 
	  		star.pl_num >= Settings.stars.minPlanets && 
	  		star.pl_num <= Settings.stars.maxPlanets &&
	  		distanceLY >= Settings.stars.minDistance &&
	  		distanceLY <= Settings.stars.maxDistance) {


	 
		  	/*
		  	// render as sprite
		  	sprite = new THREE.Sprite({
		  		map: new THREE.ImageUtils.loadTexture('/img/pluto.jpg'),
		  		useScreenCoordinates: false,
		  		color: 0xffffff 
		  	});
				sprite.position.set( x, y, z);

				// sprite.opacity = 0.25;
				app.stars.push( sprite );
				app.scene.add( sprite );
				*/

		  	// get the color of the sar color range (0 - 12)
		  	/*
		  	var material = new THREE.MeshBasicMaterial({ 
					color: 0xffffff, 
					wireframe: false 
				});
				*/

		  	// var obj = new THREE.Mesh(geometry, material);
		  	// obj.position.set(x, y, z);

		  	// only render stars that have a measured distance
		  	if( distance && distance > 0 ) {

		  		// app.stars.push( obj );
		  		// app.scene.add( obj );

		  		particle = new THREE.Vector3(x, y, z);

		  		particle.properties = {
			  		name: star.pl_hostname,
			  		type: star.type,
			  		distance: star.dist + ' / ' + Math.round(star.dist * Settings.PC),
			  		mass: star.mass,
			  		radius: star.radius,
			  		planets: star.pl_num
			  	}
		    	//particle.position.set(x, y, z);

		  		// add it to the geometry
		  		$this.particles.vertices.push( particle );
		  		app.stars.push( particle );
		  	}

	  	} else {
	  		console.log( 'planet not in range' );
	  	}

	  });

		var particleSystem = new THREE.ParticleSystem(
	    $this.particles,
	    $this.material
	  );

  	$this.particleSystems.add( particleSystem );
	});

	//app.stars.push( particles );
	

	app.particleSystems = this.particleSystems;
	app.scene.add( this.particleSystems );

	/*
	_.each( this.stars, function( star, idx ){

		var particleTexture = THREE.ImageUtils.loadTexture('images/spark.png');

		particleGroup = new THREE.Object3D();
		particleAttributes = { startSize: [], startPosition: [], randomness: [] };
		
		var totalParticles = $this.stars.length;
		var radiusRange = 12;

		for( var i = 0; i < totalParticles; i++ ) {
		    
		  var spriteMaterial = new THREE.SpriteMaterial({ 
		  	map: particleTexture, 
		  	useScreenCoordinates: false, 
		  	color: 0xffffff 
		  });

			var sprite = new THREE.Sprite( spriteMaterial );
			sprite.scale.set( 32, 32, 1.0 );

			sprite.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );
			sprite.position.setLength( radiusRange * Math.random() );
			
			// sprite.color.setRGB( Math.random(),  Math.random(),  Math.random() ); 
			sprite.material.color.setHSL( Math.random(), 0.9, 0.7 ); 
			
			// sprite.opacity = 0.80; // translucent particles
			sprite.material.blending = THREE.AdditiveBlending; // "glowing" particles
			
			particleGroup.add( sprite );
			// add variable qualities to arrays, if they need to be accessed later
			particleAttributes.startPosition.push( sprite.position.clone() );
			particleAttributes.randomness.push( Math.random() );
		}
		particleGroup.position.y = 50;
		$this.app.scene.add( particleGroup );
	});

*/

	// for each particle set the space position depending on its distance, right acsession and declination
	// taken from http://www.stjarnhimlen.se/comp/tutorial.html#10

	//x = r * cos(RA) * cos(Decl);
  //y = r * sin(RA) * cos(Decl);
  //z = r * sin(Decl);

	//this.material = new THREE.ParticleSystemMaterial();
	//var particles = new THREE.ParticleSystem( this.geometry, this.material );

	//app.scene.add( particles );

	return stars;
};
