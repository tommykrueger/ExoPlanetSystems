<?php
App::uses('AppController', 'Controller');
/**
 * Phlplanets Controller
 *
 * @property Phlplanet $Phlplanet
 */
class PhlplanetsController extends AppController {

	private $filepath = '../../../app/js/data/';
	private $AU = 149597870.700;

	// exports the star system to a json representation
	public function exportAll( $name = null ){

		// the database fields that should be 
		$this->fields = array(
			'P. Name' => 'name', 
			'P. Zone Class' => 'zclass',
			'P. Mass Class' => 'mclass',
			'P. Composition Class' => 'cclass',
			'P. Atmosphere Class' => 'aclass',
			'P. Habitable Class' => 'hclass',
			'P. Mass' => 'mass',
			'P. Radius' => 'radius',
			'P. Density' => 'density',
			'P. Gravity' => 'gravity',
			'P. Teq Mean' => 'temp',
			'P. Mag' => 'magnitude',
			'P. Appar Size' => 'appsize',
			'P. Period' => 'period',
			'P. Sem Major Axis' => 'semimajoraxis',
			'P. Eccentricity' => 'eccentricity',
			'P. Mean Distance' => 'meandistance',
			'P. Inclination' => 'inclination',
			'P. Omega' => 'omega',
			'S. Name' => 'hostname',
			'S. Constellation' => 'constellation',
			'S. Type' => 'spectraltype',
			'S. Mass' => 'constellation',
			'S. Radius' => 'constellation',
			'S. Teff' => 'star_temp',
			'S. Luminosity' => 'star_luminosity',
			'S. RA' => 'rightacsession',
			'S. DEC' => 'declination',
			'S. No. Planets' => 'planets',
			'S. Hab Zone Min' => 'minhz',
			'S. Hab Zone Max' => 'maxhz',
			'P. Disc. Method' => 'discmethod',
			'P. Disc Year' => 'discyear'
		);


		$systemsArray = array(
			'name' => '',
			'radius' => '',
			'stars' => array(),
			'satellites' => array()
		);

		$exportedSystems = array();
		$systems = $this->Phlplanet->find('all');

		foreach($systems as $s) {

				$systemsArray = array(
					'name' => '',
					'stars' => array(),
					'satellites' => array()
				);

				if( !in_array($s['Phlplanet']['S. Name'], $exportedSystems) ) {
					//echo 'Star not yet rendered <br/>';

					$exportedSystems[] = $s['Phlplanet']['S. Name'];

					$systemsArray['name'] = $s['Phlplanet']['S. Name'];

					$starData = array(
						'name' => $s['Phlplanet']['S. Name'],
						'type' => 'star',
						'spec' => substr( $s['Phlplanet']['S. Type'], 0 ,1),
						'temp' => (float)$s['Phlplanet']['S. Teff'],
						'radius' => (float)$s['Phlplanet']['S. Radius'],
						'lum' => (float)$s['Phlplanet']['S. Luminosity'],
						'minhz' => (float)$s['Phlplanet']['S. Hab Zone Min'],
						'maxhz' => (float)$s['Phlplanet']['S. Hab Zone Max'],
						'texture' => $this->getStarTexture( $s )
					);				

					$systemsArray['stars'][] = $starData;
					$systemsArray['satellites'] = array();

					$i = 0;
					foreach($systems as $planet) {

						if( $s['Phlplanet']['S. Name'] == $planet['Phlplanet']['S. Name'] ) {

							// set up the planet data
							$planetData = array(
								'name' => $planet['Phlplanet']['P. Name'],
								'type' => 'planet',
								'masse' => (float)$planet['Phlplanet']['P. Mass'], // earth masses
								'distance' => (float)$planet['Phlplanet']['S. Distance'], // distance
								'temp' => (float)$planet['Phlplanet']['P. Teq Mean'], // mean surface temparature in Kelvin
								'radius' => (float)$planet['Phlplanet']['P. Radius'], // earth radii
								'semiMajorAxis' => (float)($planet['Phlplanet']['P. Sem Major Axis'] * $this->AU),
								'eccentricity' => $planet['Phlplanet']['P. Eccentricity'],
								'inclination' => $planet['Phlplanet']['P. Inclination'],
								'siderealOrbitPeriod' => (float)$planet['Phlplanet']['P. Period'],
								'omega' => (float)$planet['Phlplanet']['P. Omega'],
								'habitable' => $planet['Phlplanet']['P. Habitable'],
								'esi' => strtolower( $planet['Phlplanet']['P. ESI'] ),
								'habitableMoon' => $planet['Phlplanet']['P. Hab Moon'],
								'method' => $planet['Phlplanet']['P. Disc. Method'],
								'year' => str_replace(' ', '', $planet['Phlplanet']['P. Disc. Year']),
								'tempClass' => strtolower( $planet['Phlplanet']['P. Zone Class'] ),
								'class' => strtolower( $planet['Phlplanet']['P. Mass Class'] ),

								// hypotetical
								'color' => $this->getPlanetColor( $planet ),
								'texture' => $this->getPlanetTexture( $planet )
							);

							//echo $this->getPlanetTexture( $planet ) . '<br/>';

							$systemsArray['satellites'][] = $planetData;

							$i++;
						}
					}

					$systemsJSON = json_encode($systemsArray);

					$filename = str_replace(' ', '', $s['Phlplanet']['S. Name']);
					$filename = strtolower($s['Phlplanet']['S. Name']);

					if(file_put_contents($this->filepath . 'planetsystems/' . $filename .'.json', $systemsJSON)){
						$this->Session->setFlash(__('Systems have been generated!'));
					}
				}

		}

		//exit();
		$this->redirect($this->referer());

	}

	public function getPlanetColor( $planetData ) {

		$temparatureColors = array(
			'Cold' => array(50, 50, 200),
			'Warm' => array(200, 50, 100),
			'Hot' => array(200, 25, 25)
		);

		// use the composition feature to load texture files
		// this texture is to represent planet surface structure but not colors
		$compositionColors = array(
			'gas' => array(90, 120, 30),
			'water-gas' => array(90, 120, 30),
			'rocky-water' => array(200, 50, 100),
			'rocky-iron' => array(200, 50, 100),
			'iron' => array(200, 50, 100)
		);

		$planetTemparatureClass = $planetData['Phlplanet']['P. Zone Class'];
		$planetCompositionClass = $planetData['Phlplanet']['P. Composition Class'];
		$planetAthmosphereClass = $planetData['Phlplanet']['P. Atmosphere Class'];
		$zoneClass = $planetData['Phlplanet']['P. Zone Class'];

		if( !empty($planetTemparatureClass) )
			$temparatureColor = $temparatureColors[ $planetTemparatureClass ];

		if( !empty($planetCompositionClass) )
			$compositionColor = $compositionColors[ $planetCompositionClass ];
	}

	public function getPlanetTexture( $planetData ) {

		$planetTemparatureClass = strtolower( $planetData['Phlplanet']['P. Zone Class'] );
		$planetMassClass = strtolower( $planetData['Phlplanet']['P. Mass Class'] );
		$planetCompositionClass = strtolower( $planetData['Phlplanet']['P. Composition Class'] );
		$planetAthmosphereClass = strtolower( $planetData['Phlplanet']['P. Atmosphere Class'] );
		
		return $planetTemparatureClass . '-' . $planetMassClass . '.jpg';
	}

	/**
	 * get all stars that have planets from the database and save as json file
	 */
	public function getStars() {

		$loadedStars = array();
		$stars = $this->Phlplanet->find('all');

		$starsArray = array();
		foreach($stars as $star) {

			if( !in_array($star['Phlplanet']['S. Name'], $loadedStars) ) {

				$loadedStars[] = $star['Phlplanet']['S. Name'];

				$starArray = array();

				$starArray['pl_hostname'] = $star['Phlplanet']['S. Name'];
				$starArray['pl_num'] = (int)$star['Phlplanet']['S. No. Planets'];
				$starArray['ra'] = (float)$star['Phlplanet']['S. RA'];
				$starArray['dec'] = (float)$star['Phlplanet']['S. DEC'];
				$starArray['dist'] = (float)$star['Phlplanet']['S. Distance'];
				$starArray['mass'] = (float)$star['Phlplanet']['S. Mass'];
				$starArray['radius'] = (float)$star['Phlplanet']['S. Radius'];
				$starArray['type'] = $star['Phlplanet']['S. Type'];

				$starsArray[] = $starArray;
			}
		}

		//var_dump($starsArray);

		$json = json_encode($starsArray);

		if(file_put_contents($this->filepath . 'stars.json', $json)){
			$this->Session->setFlash(__('Stars have been generated!'));
		}

		$this->redirect($this->referer());
	}

	// used for ajax search
	public function find() {
		$data = $_REQUEST['data'];

		//var_dump( $data );

		if( $data ) {

			$stars = array();
			// try to find planet names and host names that contain the search key

			$s = $this->Phlplanet->find('all');

			foreach( $s as $star ) {
				if( stristr($star['Phlplanet']['S. Name'], $data )) {
					$stars[] = $star;
				}
			}

			// allow maximum of 20 host names to be found
			$maxCount = 0;

			$starsArray = array();
			foreach($stars as $star) {

				if( $maxCount >= 500 )
					break;

				$starArray = array();

				$starArray['pl_hostname'] = $star['Phlplanet']['S. Name'];
				$starArray['pl_num'] = (int)$star['Phlplanet']['S. No. Planets'];
				$starArray['ra'] = (float)$star['Phlplanet']['S. RA'];
				$starArray['dec'] = (float)$star['Phlplanet']['S. DEC'];
				$starArray['dist'] = (float)$star['Phlplanet']['S. Distance'];
				$starArray['mass'] = (float)$star['Phlplanet']['S. Mass'];
				$starArray['hd'] = $star['Phlplanet']['S. Name HD'];
				$starArray['hip'] = $star['Phlplanet']['S. Name HIP'];
				$starArray['type'] = $star['Phlplanet']['S. Type'];

				if( !$this->in_arrayr( $starArray['pl_hostname'], $starsArray ) ){
					$starsArray[] = $starArray;

					$maxCount++;
				}
			}
		
			$unique = $this->array_multi_unique( $starsArray );

			// var_dump( $starsArray );
			echo json_encode( $unique );
			exit();
		}
	}


	public function getStarTexture( $star ) {
		return '';
	}

	public function array_multi_unique($multiArray){

	  $uniqueArray = array();

	  foreach($multiArray as $subArray){

	    if(!in_array($subArray, $uniqueArray)){
	      $uniqueArray[] = $subArray;
	    }
	  }
	  return $uniqueArray;
	}

	public function in_arrayr($needle, $haystack) {
		foreach ($haystack as $v) {
			if ($needle == $v) return true;
			elseif (is_array($v)) return in_array($needle, $v);
		}
		return false;
	}


	public function getPlanetClasses() {
		$exoplanets = array(
			'Cold' => array(
		    'Mercurian' => 0,
		    'Subterran' => 0,
		    'Terran' => 0,
		    'Superterran' => 0,
		    'Neptunian' => 0,
		    'Jovian' => 0
		  ),
		  'Warm' => array(
		    'Mercurian' => 0,
		    'Subterran' => 0,
		    'Terran' => 0,
		    'Superterran' => 0,
		    'Neptunian' => 0,
		    'Jovian' => 0
		  ),
		  'Hot' => array(
		    'Mercurian' => 0,
		    'Subterran' => 0,
		    'Terran' => 0,
		    'Superterran' => 0,
		    'Neptunian' => 0,
		    'Jovian' => 0
		  )
		);

		$planetZoneClasses = array('Cold', 'Warm', 'Hot');
		$planetMassClasses = array('Mercurian', 'Subterran', 'Terran', 'Superterran', 'Neptunian', 'Jovian');

		$planets = $this->Phlplanet->find('all');

		foreach( $planets as $planet ) {
			$planetZoneClass = $planet['Phlplanet']['P. Zone Class'];
			$planetMassClass = $planet['Phlplanet']['P. Mass Class'];

			if( !empty($planetZoneClass) && !empty($planetMassClass) )
				$exoplanets[ $planetZoneClass ][ $planetMassClass ] ++;
		}

		$exoplanetsJSON = json_encode( $exoplanets );

		if(file_put_contents($this->filepath . 'planetclasses.json', $exoplanetsJSON)){
			$this->Session->setFlash(__('Planet Classes have been generated!'));
		}

		$this->redirect($this->referer());
	}


	public function getStatistics(){

		// statistics
		$statistics = array(
			'largestPlanet' => array(),
			'smallestPlanet' => array(),
			'massHighPlanet' => array(),
			'massLowPlanet' => array(),
			'nearestPlanet' => array(),
			'farestPlanet' => array(),
			'earthSimilarPlanet' => array(),
			'mostPlanets' => array()
		);

		$planets = $this->Phlplanet->find('all');

		foreach( $planets as $planet ) {

			$radius = $planet['Phlplanet']['P. Radius'];
			$mass = $planet['Phlplanet']['P. Mass'];
			$distance = $planet['Phlplanet']['S. Distance'];
			$esi = $planet['Phlplanet']['P. ESI'];
			$numberPlanets = $planet['Phlplanet']['S. No. Planets'];

			// min,max radius
			if( $radius > 0) {

				if( !$statistics['largestPlanet'] || $radius > $statistics['largestPlanet']['radius'] ) {
					$statistics['largestPlanet'] = $this->getPlanetData( $planet );
				}
				if( !$statistics['smallestPlanet'] || $radius < $statistics['smallestPlanet']['radius'] ) {
					$statistics['smallestPlanet'] = $this->getPlanetData( $planet );
				}
			}

			// min,max mass
			if( $mass > 0) {
				if( !$statistics['massHighPlanet'] || $mass > $statistics['massHighPlanet']['masse'] ) {
					$statistics['massHighPlanet'] = $this->getPlanetData( $planet );
				}
				if( !$statistics['massLowPlanet'] || $mass < $statistics['massLowPlanet']['masse'] ) {
					$statistics['massLowPlanet'] = $this->getPlanetData( $planet );
				}
			}

			// min,max distance
			if( $distance > 0) {
				if( !$statistics['nearestPlanet'] || $distance < $statistics['nearestPlanet']['distance'] ) {
					$statistics['nearestPlanet'] = $this->getPlanetData( $planet );
				}
				if( !$statistics['farestPlanet'] || $distance > $statistics['farestPlanet']['distance'] ) {
					$statistics['farestPlanet'] = $this->getPlanetData( $planet );
				}
			}

			// esi
			if( !$statistics['earthSimilarPlanet'] || $esi > $statistics['earthSimilarPlanet']['esi'] ) {
				$statistics['earthSimilarPlanet'] = $this->getPlanetData( $planet );
			}

			// number planets
			if( !$statistics['mostPlanets'] || $numberPlanets > $statistics['mostPlanets']['planets'] ) {
				$statistics['mostPlanets'] = $this->getPlanetData( $planet );
			}

		}

		$statisticsJSON = json_encode( $statistics );

		if(file_put_contents($this->filepath . 'statistics.json', $statisticsJSON)){
			$this->Session->setFlash(__('Statistics have been generated!'));
		}

		$this->redirect($this->referer());
	}

	public function getPlanetData( $planet ) {

		$planetData = array(
			'name' => $planet['Phlplanet']['P. Name'],
			'type' => 'planet',
			'masse' => (float)$planet['Phlplanet']['P. Mass'], // earth masses
			'temp' => (float)$planet['Phlplanet']['P. Teq Mean'], // mean surface temparature in Kelvin
			'radius' => (float)$planet['Phlplanet']['P. Radius'], // earth radii
			'distance' => (float)$planet['Phlplanet']['S. Distance'], // parsec
			'semiMajorAxis' => (float)($planet['Phlplanet']['P. Sem Major Axis'] * $this->AU),
			'eccentricity' => $planet['Phlplanet']['P. Eccentricity'],
			'inclination' => $planet['Phlplanet']['P. Inclination'],
			'siderealOrbitPeriod' => (float)$planet['Phlplanet']['P. Period'],
			'omega' => (float)$planet['Phlplanet']['P. Omega'],
			'habitable' => (int)$planet['Phlplanet']['P. Habitable'],
			'esi' => (float)$planet['Phlplanet']['P. ESI'],
			'habitableMoon' => (int)$planet['Phlplanet']['P. Hab Moon'],
			'method' => $planet['Phlplanet']['P. Disc. Method'],
			'year' => str_replace(' ', '', $planet['Phlplanet']['P. Disc. Year']),
			'tempClass' => strtolower( $planet['Phlplanet']['P. Zone Class'] ),
			'class' => strtolower( $planet['Phlplanet']['P. Mass Class'] ),
			'planets' => (int)$planet['Phlplanet']['S. No. Planets'],

			// hypotetical
			'color' => $this->getPlanetColor( $planet ),
			'texture' => $this->getPlanetTexture( $planet )
		);
		
		return $planetData;
	}


/**
 * index method
 *
 * @return void
 */
	public function index() {
		$this->Phlplanet->recursive = 0;
		$this->set('phlplanets', $this->paginate());
	}

/**
 * view method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		$this->Phlplanet->id = $id;
		if (!$this->Phlplanet->exists()) {
			throw new NotFoundException(__('Invalid phlplanet'));
		}
		$this->set('phlplanet', $this->Phlplanet->read(null, $id));
	}

/**
 * add method
 *
 * @return void
 */
	public function add() {
		if ($this->request->is('post')) {
			$this->Phlplanet->create();
			if ($this->Phlplanet->save($this->request->data)) {
				$this->Session->setFlash(__('The phlplanet has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The phlplanet could not be saved. Please, try again.'));
			}
		}
	}

/**
 * edit method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function edit($id = null) {
		$this->Phlplanet->id = $id;
		if (!$this->Phlplanet->exists()) {
			throw new NotFoundException(__('Invalid phlplanet'));
		}
		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->Phlplanet->save($this->request->data)) {
				$this->Session->setFlash(__('The phlplanet has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The phlplanet could not be saved. Please, try again.'));
			}
		} else {
			$this->request->data = $this->Phlplanet->read(null, $id);
		}
	}

/**
 * delete method
 *
 * @throws MethodNotAllowedException
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function delete($id = null) {
		if (!$this->request->is('post')) {
			throw new MethodNotAllowedException();
		}
		$this->Phlplanet->id = $id;
		if (!$this->Phlplanet->exists()) {
			throw new NotFoundException(__('Invalid phlplanet'));
		}
		if ($this->Phlplanet->delete()) {
			$this->Session->setFlash(__('Phlplanet deleted'));
			$this->redirect(array('action' => 'index'));
		}
		$this->Session->setFlash(__('Phlplanet was not deleted'));
		$this->redirect(array('action' => 'index'));
	}
}
