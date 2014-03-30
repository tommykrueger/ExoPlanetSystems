function Loader( data ){

	this.source = data.source;
	this.data = null;
}

Loader.prototype.load = function() {
	// load the json file and add data to the class
	var $this = this;

	$.getJSON('js/data/' + $this.source, function( data ) {
		console.log( data );
		$this.data = data;
		return $this.data;
	});
};