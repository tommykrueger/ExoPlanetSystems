/*
 * Utility class for helpers and external behaviour
 */

var Utils = {};

Utils.renderStats = function( container ) {

	// add Stats.js - https://github.com/mrdoob/stats.js
	this.stats = new Stats();

	$(this.stats.domElement).css({
		'position': 'absolute',
		'bottom': '0px',
		'z-index': 99
	});

	if( container )
		container.append( this.stats.domElement );
	else
		$('body').append( this.stats.domElement );

}

// taken from: https://github.com/mrdoob/three.js/issues/78
Utils.toScreenXY = function ( position, camera, jqdiv ) {

    var pos = position.clone();
    projScreenMat = new THREE.Matrix4();
    projScreenMat.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
    //projScreenMat.multiplyVector3( pos );

    pos.applyMatrix4( projScreenMat );

    return { 
    	x: ( pos.x + 1 ) * jqdiv.width() / 2,
      y: ( - pos.y + 1) * jqdiv.height() / 2 
    };

}

Utils.toXYCoords = function(pos, camera, projector) {
	camera.updateMatrixWorld();
	var vector = projector.projectVector(pos.clone(), camera);
	vector.x = (vector.x + 1)/2 * window.innerWidth;
	vector.y = -(vector.y - 1)/2 * window.innerHeight;
	return vector;
}

// project a 3D vector to a 2D vector depending on the camera angle
Utils.project2D = function(mesh, app) {

	app.scene.updateMatrixWorld( true );

	position = new THREE.Vector3();
	pos = position.getPositionFromMatrix( mesh.matrixWorld );
	
	app.camera.updateMatrixWorld(true);

	var vector = app.projector.projectVector(pos.clone(), app.camera);

	vector.x = (vector.x + 1)/2 * window.innerWidth;
	vector.y = -(vector.y - 1)/2 * window.innerHeight;

	return vector;
}


// taken from: http://zachberry.com/blog/tracking-3d-objects-in-2d-with-three-js/
Utils.getPosition2D = function( object, camera, projector){

	var p, v, percX, percY, left, top;

	// this will give us position relative to the world
	p = object.position.clone();

	// projectVector will translate position to 2d
	v = projector.projectVector(p, camera);

	// Pick a point in front of the camera in camera space:
	var pLocal = new THREE.Vector3(0, 0, -1);

	// Now transform that point into world space:
	var pWorld = pLocal.applyMatrix4( camera.matrixWorld );
	
	// You can now construct the desired direction vector:
	var dir = pWorld.sub( camera.position ).normalize();

	var scalar = (p.x - camera.position.x) / dir.x;
	//console.log( scalar );

  if(scalar < 0) {
  	//console.log('object behind camera');
  	return false; //this means the point was behind the camera, so discard
  }
	//console.log( v );

	// translate our vector so that percX=0 represents
	// the left edge, percX=1 is the right edge,
	// percY=0 is the top edge, and percY=1 is the bottom edge.
	percX = (v.x + 1) / 2;
	percY = (-v.y + 1) / 2;

	// scale these values to our viewport size
	left = percX * window.innerWidth;
	top = percY * window.innerHeight;

	return { x: left, y: top };
};

// taken from: http://stackoverflow.com/questions/3177855/how-to-format-numbers-similar-to-stack-overflow-reputation-format
Utils.numberFormat = function(number) {
	var repString = number.toString();

  if ( number < 1000 ) {
		repString = number;
  } else if ( number < 1000000 ) {
		repString = (Math.round((number / 1000) * 10) / 10) + ' K'
  } else if ( number < 1000000000 ) {
		repString = (Math.round((number / 1000000) * 10) / 10) + ' Mio'
  } else if ( number < 1000000000000000000 ) {
		repString = (Math.round((number / 1000000000) * 10) / 10) + ' Bio'
  }

  return repString;
}

// takes a hex string (6 characters) and returns rgb components as object
Utils.hexToRGB = function( hex ){

	var r = parseInt( hex.substring(0,2), 16);
	var g = parseInt( hex.substring(2,4), 16);
	var b = parseInt( hex.substring(4,6), 16);

	return rgb = {
		r: r,
		g: g,
		b: b
	}
}

// taken from: http://www.html5canvastutorials.com/labs/html5-canvas-text-along-arc-path/
Utils.drawTextAlongArc = function( context, str, centerX, centerY, radius, angle ) {
  var len = str.length, s;
  context.save();
  context.translate(centerX, centerY);
  context.rotate(-1 * angle / 2);
  context.rotate(-1 * (angle / len) / 2);
  for(var n = 0; n < len; n++) {
    context.rotate(angle / len);
    context.save();
    context.translate(0, -1 * radius);
    s = str[n];
    context.fillText(s, 0, 0);
    context.restore();
  }
  context.restore();
}

// taken from: http://jsfiddle.net/Brfp3/3/
Utils.textCircle = function(ctx, text, x, y, radius, space, top){
   space = space || 0;
   var numRadsPerLetter = (Math.PI - space * 2) / text.length;
   ctx.save();
   ctx.translate(x,y);
   var k = (top) ? 1 : -1; 
   ctx.rotate(-k * ((Math.PI - numRadsPerLetter) / 2 - space));
   for(var i=0;i<text.length;i++){
      ctx.save();
      ctx.rotate(k*i*(numRadsPerLetter));
      ctx.textAlign = "center";
     	ctx.textBaseline = (!top) ? "top" : "bottom";
     	ctx.fillText(text[i],0,-k*(radius));
      ctx.restore();
   }
   ctx.restore();
}