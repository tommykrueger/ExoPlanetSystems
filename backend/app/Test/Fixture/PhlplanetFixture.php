<?php
/**
 * PhlplanetFixture
 *
 */
class PhlplanetFixture extends CakeTestFixture {

/**
 * Fields
 *
 * @var array
 */
	public $fields = array(
		'P. Name' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 32, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Name Kepler' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 18, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Name KOI' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 6, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Zone Class' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 4, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Mass Class' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 11, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Composition Class' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 11, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Atmosphere Class' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 13, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Habitable Class' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 17, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Min Mass (EU)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 7, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Mass (EU)' => array('type' => 'float', 'null' => true, 'default' => null, 'length' => '7,2'),
		'P. Max Mass (EU)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 10, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Radius (EU)' => array('type' => 'float', 'null' => true, 'default' => null, 'length' => '4,2'),
		'P. Density (EU)' => array('type' => 'float', 'null' => true, 'default' => null, 'length' => '5,2'),
		'P. Gravity (EU)' => array('type' => 'float', 'null' => true, 'default' => null, 'length' => '5,2'),
		'P. Esc Vel (EU)' => array('type' => 'float', 'null' => true, 'default' => null, 'length' => '4,2'),
		'P. SFlux Min (EU)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 15, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. SFlux Mean (EU)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 15, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. SFlux Max (EU)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 15, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Teq Min (K)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 5, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Teq Mean (K)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 5, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Teq Max (K)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 5, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Ts Min (K)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 5, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Ts Mean (K)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 5, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Ts Max (K)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 5, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Surf Press (EU)' => array('type' => 'float', 'null' => true, 'default' => null, 'length' => '7,1'),
		'P. Mag' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 5, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Appar Size (deg)' => array('type' => 'float', 'null' => true, 'default' => null, 'length' => '4,2'),
		'P. Period (days)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 8, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Sem Major Axis (AU)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 8, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Eccentricity' => array('type' => 'float', 'null' => true, 'default' => null, 'length' => '3,2'),
		'P. Mean Distance (AU)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 6, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Inclination (deg)' => array('type' => 'float', 'null' => true, 'default' => null, 'length' => '3,1'),
		'P. Omega (deg)' => array('type' => 'float', 'null' => true, 'default' => null, 'length' => '4,1'),
		'S. Name' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 30, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'S. Name HD' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 11, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'S. Name HIP' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 11, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'S. Constellation' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 3, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'S. Type' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 11, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'S. Mass (SU)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 3, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'S. Radius (SU)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 4, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'S. Teff (K)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 6, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'S. Luminosity (SU)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 9, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'S. [Fe/H]' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 5, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'S. Age (Gyrs)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 5, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'S. Appar Mag' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 3, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'S. Distance (pc)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 6, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'S. RA (hrs)' => array('type' => 'float', 'null' => true, 'default' => null, 'length' => '6,4'),
		'S. DEC (deg)' => array('type' => 'float', 'null' => true, 'default' => null, 'length' => '7,4'),
		'S. Mag from Planet' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 4, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'S. Size from Planet (deg)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 6, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'S. No. Planets' => array('type' => 'integer', 'null' => true, 'default' => null, 'length' => 1),
		'S. No. Planets HZ' => array('type' => 'integer', 'null' => true, 'default' => null, 'length' => 1),
		'S. Hab Zone Min (AU)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 5, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'S. Hab Zone Max (AU)' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 5, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. HZD' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 7, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. HZC' => array('type' => 'float', 'null' => true, 'default' => null, 'length' => '4,2'),
		'P. HZA' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 5, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. HZI' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 3, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. SPH' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 3, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Int ESI' => array('type' => 'float', 'null' => true, 'default' => null, 'length' => '3,2'),
		'P. Surf ESI' => array('type' => 'float', 'null' => true, 'default' => null, 'length' => '3,2'),
		'P. ESI' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 3, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'S. HabCat' => array('type' => 'integer', 'null' => true, 'default' => null, 'length' => 1),
		'P. Habitable' => array('type' => 'integer', 'null' => true, 'default' => null, 'length' => 1),
		'P. Hab Moon' => array('type' => 'integer', 'null' => true, 'default' => null, 'length' => 1),
		'P. Confirmed' => array('type' => 'integer', 'null' => true, 'default' => null, 'length' => 1),
		'P. Disc. Method' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 15, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'P. Disc. Year' => array('type' => 'string', 'null' => true, 'default' => null, 'length' => 12, 'collate' => 'utf8_general_ci', 'charset' => 'utf8'),
		'indexes' => array(
			
		),
		'tableParameters' => array('charset' => 'utf8', 'collate' => 'utf8_general_ci', 'engine' => 'InnoDB')
	);

/**
 * Records
 *
 * @var array
 */
	public $records = array(
		array(
			'P. Name' => 'Lorem ipsum dolor sit amet',
			'P. Name Kepler' => 'Lorem ipsum dolo',
			'P. Name KOI' => 'Lore',
			'P. Zone Class' => 'Lo',
			'P. Mass Class' => 'Lorem ips',
			'P. Composition Class' => 'Lorem ips',
			'P. Atmosphere Class' => 'Lorem ipsum',
			'P. Habitable Class' => 'Lorem ipsum dol',
			'P. Min Mass (EU)' => 'Lorem',
			'P. Mass (EU)' => 1,
			'P. Max Mass (EU)' => 'Lorem ip',
			'P. Radius (EU)' => 1,
			'P. Density (EU)' => 1,
			'P. Gravity (EU)' => 1,
			'P. Esc Vel (EU)' => 1,
			'P. SFlux Min (EU)' => 'Lorem ipsum d',
			'P. SFlux Mean (EU)' => 'Lorem ipsum d',
			'P. SFlux Max (EU)' => 'Lorem ipsum d',
			'P. Teq Min (K)' => 'Lor',
			'P. Teq Mean (K)' => 'Lor',
			'P. Teq Max (K)' => 'Lor',
			'P. Ts Min (K)' => 'Lor',
			'P. Ts Mean (K)' => 'Lor',
			'P. Ts Max (K)' => 'Lor',
			'P. Surf Press (EU)' => 1,
			'P. Mag' => 'Lor',
			'P. Appar Size (deg)' => 1,
			'P. Period (days)' => 'Lorem ',
			'P. Sem Major Axis (AU)' => 'Lorem ',
			'P. Eccentricity' => 1,
			'P. Mean Distance (AU)' => 'Lore',
			'P. Inclination (deg)' => 1,
			'P. Omega (deg)' => 1,
			'S. Name' => 'Lorem ipsum dolor sit amet',
			'S. Name HD' => 'Lorem ips',
			'S. Name HIP' => 'Lorem ips',
			'S. Constellation' => 'L',
			'S. Type' => 'Lorem ips',
			'S. Mass (SU)' => 'L',
			'S. Radius (SU)' => 'Lo',
			'S. Teff (K)' => 'Lore',
			'S. Luminosity (SU)' => 'Lorem i',
			'S. [Fe/H]' => 'Lor',
			'S. Age (Gyrs)' => 'Lor',
			'S. Appar Mag' => 'L',
			'S. Distance (pc)' => 'Lore',
			'S. RA (hrs)' => 1,
			'S. DEC (deg)' => 1,
			'S. Mag from Planet' => 'Lo',
			'S. Size from Planet (deg)' => 'Lore',
			'S. No. Planets' => 1,
			'S. No. Planets HZ' => 1,
			'S. Hab Zone Min (AU)' => 'Lor',
			'S. Hab Zone Max (AU)' => 'Lor',
			'P. HZD' => 'Lorem',
			'P. HZC' => 1,
			'P. HZA' => 'Lor',
			'P. HZI' => 'L',
			'P. SPH' => 'L',
			'P. Int ESI' => 1,
			'P. Surf ESI' => 1,
			'P. ESI' => 'L',
			'S. HabCat' => 1,
			'P. Habitable' => 1,
			'P. Hab Moon' => 1,
			'P. Confirmed' => 1,
			'P. Disc. Method' => 'Lorem ipsum d',
			'P. Disc. Year' => 'Lorem ipsu'
		),
	);

}
