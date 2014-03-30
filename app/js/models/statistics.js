StatisticsModel = function( options ){
	this.html;
	this.options = options;
};

// rende a given html
StatisticsModel.prototype.render = function(){
	var $this = this;
	var $container = $('<div></div>');
	$container.append('<h1 id="headline">Current distribution of confirmed exoplanets</h1>');
	var $table = $('<table id="table-planetclasses" cellpadding="0" cellspacing="0"></table>');

	// show loader
	//$('#loader').show();
	$.getJSON('js/data/planetclasses.json', function( json ){

		//$('#loader').hide();

		_.each( json, function( planetClasses, temparatureClass ) {
			//console.log( planetClasses, temparatureClass );
	   	var $tr = $('<tr></tr>');

	    _.each( planetClasses, function( planetAmount, planetClass ) {
	    	//console.log( planetClass, planetAmount );

	    	var imageName = temparatureClass.toLowerCase() + '-' + planetClass.toLowerCase();
		    var $td = $('<td></td>');

		    $td.append('<img src="img/planets/' + imageName + '.jpg" />');
		    $td.append('<span class="planet-amount">' + planetAmount + '</span>');
		    $td.append('<span class="planet-type">' + temparatureClass + ' '+ planetClass +'</span>');

		    $tr.append( $td );
		  });

		 	$table.append( $tr );

	  });

	  $container.append($table);

	  if( $this.options.popup ) {
			PopupView.init(null, null, $container, null, {
				'width': 960,
				'height': 560,
				'margin-left': -480,
				'margin-top': -280,
				'left': '50%',
				'opacity': 1.0
			});
		}
		
		$this.html = $container;
	});

};

// return current html state
StatisticsModel.prototype.getHtml = function(){
	return this.html;
};
