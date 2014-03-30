/**
 * Define settings for the app
 */
var Settings = {}

Settings.defaultRotationSpeed = 0.0005;

// ambient light intensity of global
Settings.globalLightIntensity = 0.1;

// the default speed of the app, can be adjusted dynamically
// simulation speed can be changed to:
//   1s -> 1day
//   1s -> 1week
//   1s -> 1month
//   1s -> 1year  
//Settings.speed = (60 * 60 * 24); // 1s in vis is 1 day in realtime

// Global settings

// 1 AU (astronomical unit) in km
Settings.AU = 149597870.700;

// the distance for one light year in km
Settings.LY = 9460730472580.800;

// the distance of one parsec in light years
Settings.PC = 3.26156;

// define how large 1px is in comparison to the the real sizes
// every distance will be divided by this value
Settings.distancePixelRatio = 25000;

// define how large the objects radius should be. The objects radius
// will be divided by this value

// For planets
Settings.radiusPixelRatio = 500;

// For stars
Settings.radiusStarPixelRatio = 5000;

// solar system settings
Settings.renderSystemPlane = true;

// planet settings
Settings.planets = {};
Settings.planets.defaultColor = [0, 0, 200];

// earth radius in km
Settings.radiusEarth = 6371;
Settings.massEarth = 1;

// jupiter radius in km
Settings.radiusJupiter = 69911;

// orbit parameters
Settings.orbitColor = 0x9090bb;
Settings.orbitHoverColor = 0xffffff;
Settings.orbitTransparency = 0.5;
Settings.orbitStrokeWidth = 10.2;

// set the default rotation time in days for stars
Settings.defaultStarRotationPeriod = 25.00;

Settings.showInclination = true;
Settings.showStars = true;
Settings.showDistances = true;

//Settings.habitableZoneColor = 0x66CCFF;
Settings.habitableZoneColor = 0x008000;


// Orbit colors are used every time another
// system was added to the scene
Settings.orbitColors = [
	0xD59C6F,
	0x4682b4,
	0xf0e68c,
	0xd2691e,
	0x88bf8b,
	0xffa500,
	0xE89296,
	0x92DEE8,
	0x55732D,
	0x0FF7E8,

	0xE3B1E0,
	0xCA8E40,
	0x983315,
	0xA06E00,
	0xFFB100,
	0xFF6202,
	0x00579E,
	0x9E600A,
	0xFFA301,
	0x913E20
];


// kelvin to degrees factor
Settings.Kelvin = -272.15;

// labels (in px)
Settings.labelOffsetX = 6;
Settings.labelOffsetY = 2;

// Stefan Boltzmann constant (formerly used hor HZ calculation)
//Settings.Boltzmann = 5.67 * Math.pow(10, -8);

Settings.radiusSun = 696342; // km
Settings.tempSun = 5777; // kelvin
Settings.lumSun = 26.5842;

// in AU - approximated min/max distance from sun in which 
// liquid water may exist on the planets surface and green 
// house effect is not too strong
//Settings.minHZ = 0.7; // AU
//Settings.maxHZ = 1.4; // AU

// for optimistic HZ approximation
//Settings.minHZ = 0.84;
//Settings.maxHZ = 1.7;

// for pessimistic HZ approximation
Settings.minHZ = 0.95; // AU
Settings.maxHZ = 1.4; // AU

// Derived from http://en.wikipedia.org/wiki/Stellar_classification
Settings.spectralNames = {
	'o': 'Blue Giant',
	'b': 'Blue Giant',
	'a': 'White Giant',
	'f': 'Red Giant',
	'g': 'Sun like',
	'k': 'Red Giant',
	'm': 'Red Dwarf',
	'l': 'Brown Dwarf',
	't': 'Brown Dwarf',
	'y': 'Brown Dwarf'
};

Settings.spectralColors = {
	'o': 0x9BB0FF, // blue
	'b': 0xBBCCFF, // blue white
	'a': 0xFBF8FF, // white
	'f': 0xFFFFF0, // yellow white
	'g': 0xFFFF00, // yellow
	'k': 0xFF9833, // orange
	'm': 0xBB2020, // red
	'l': 0xA52A2A, // red brown
	't': 0x964B00, // brown
	'y': 0x663300  // dark brown
};



// filter settings
Settings.filters = {};
Settings.filters.habitableZones = false;

// language settings
Settings.defaultlanguage = 'en';

Settings.stars = {
	minPlanets: 1,
	maxPlanets: 12,
	minDistance: 0,
	maxDistance: 10000
};