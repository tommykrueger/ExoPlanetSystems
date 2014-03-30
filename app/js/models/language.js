Language = function(){
	
	this.lang = Settings.defaultlanguage;
	this.languageFile = this.lang + '.js';

	// the html tag names that should be translated
	this.tagNames = ['span', 'label', 'a', 'h1', 'h2', 'h3', 'h4'];

	// add all attributes that should have translation capacities
	this.attributeNames = ['title', 'value'];
	
	this.updateLanguage();

};

// change the current language and render translations
Language.prototype.changeLanguage = function( lang ){

	// dont translate if selected language = current language
	if( lang == this.lang )
		return;

	this.lang = lang;
	this.languageFile = this.lang + '.js';
	
	this.updateLanguage();
};

Language.prototype.updateLanguage = function(){
	var $this = this;

	$.ajax({
		url: 'js/lang/' + $this.languageFile + '?date=' + Math.random(),
		dataType: 'json',
		error: function( e ){
			console.log( e );
		}, 
		success: function( data ) {

			$this.translations = data[0];

			_.each($this.tagNames, function(tagName, idx) {

				var DOMelements = $('html').find( tagName );

				_.each(DOMelements, function(el, idx){

					var translationContext = $(el).html();
					var translationString = $(el).text();
					
					// check if there was a translation attribute set
					if( $(el).attr('translation') ) {
						
						$(el).html( $this.translate( $(el).attr('translation') ) );

					}else{

						translationContext = $this.translate( translationString );
						$(el).html( translationContext );
						$(el).attr('translation', translationString);
					}
					
				});

				// get the DOM with attributes
				// var DOMelements = $('html').children().each()( tagName );

			});

			console.log('app translated');
		}
	});
	
};

// translate a single string
Language.prototype.translate = function(source){

	var t = source;

	try {
		var temp = this.translations[ source ];
		if( temp && temp !== undefined)
			return temp;
	} 
	catch(e) {}

	return t;
}
