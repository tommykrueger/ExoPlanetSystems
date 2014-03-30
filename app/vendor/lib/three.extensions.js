// taken from https://github.com/jpweeks/three.js/commit/f7263828375adf6a19604b41d08ea6005ee82fc3


function getIntersection( ray, group_points ){
    //these are the available attributes in ray that I can use
        //ray.origin.x/y/z
    //ray.direction.x/y/z
    var threashold=1;
    var retpoint=false;

    //console.log( group_points.geometry.vertices.length );

        var distance = 9999999999999999999;
        //for(var i=0;i<group_points.children.length;i++){
            for(var j=0; j< group_points.geometry.vertices.length ;j++) {

                var point = group_points.geometry.vertices[j];

                var scalar = (point.x - ray.origin.x) / ray.direction.x;
                //console.log( scalar );
                if(scalar<0) continue; //this means the point was behind the camera, so discard

                // test the y scalar
                var testy = (point.y - ray.origin.y) / ray.direction.y;

                console.log('testy', Math.abs(testy - scalar) );

                if(Math.abs(testy - scalar) > threashold) continue;

                // test the z scalar
                var testz = (point.z - ray.origin.z) / ray.direction.z;
                if(Math.abs(testz - scalar) > threashold) continue;

                console.log('dist', distance);
                console.log('scalar', scalar);

                // if it gets here, we have a hit!
                if(distance>scalar){
                    distance=scalar;
                    retpoint=point;
                }
            }
        //}
    return retpoint;
}

/*
( function ( THREE ) {

THREE.Raycaster.prototype.distanceFromIntersection = ( function (origin, direction, object) {
        
        var v0 = new THREE.Vector3(), v1 = new THREE.Vector3(), v2 = new THREE.Vector3();
  return function ( origin, direction, position ) {
  
      var dot, intersect, distance;

     v0.sub( position, origin );
      dot = v0.dot( direction );
 
       intersect = v1.add( origin, v2.copy( direction ).multiplyScalar( dot ) );
       distance = position.distanceTo( intersect );
 
       return distance;
     };
 
}());

THREE.Raycaster.prototype.intersectParticleSystem = function ( object, intersects ) {

var vertices = object.geometry.vertices;
var point, distance, intersect;
 
for ( var i = 0; i < vertices.length; i ++ ) {
 
       point = vertices[ i ];
       var v0 = new THREE.Vector3(), v1 = new THREE.Vector3(), v2 = new THREE.Vector3();

       position = point.clone().applyMatrix4( object.matrixWorld );

        //position = object.matrixWorld.multiplyVector3( point.clone() );

                      var dot, intersect, distance;

                     v0.sub( position, this.origin );
                      dot = v0.dot( this.direction );
                 
                       intersect = v1.add( this.origin, v2.copy( this.direction ).multiplyScalar( dot ) );
                       distance = position.distanceTo( intersect );

 
       if ( distance > this.threshold ) {
         continue;
        }
  
        intersect = {
  
          distance: distance,
                point: point.clone(),
          face: null,
         object: object,
         vertex: i
  
        };
  
        intersects.push( intersect );
     }
  }
        
}( THREE ) );

*/