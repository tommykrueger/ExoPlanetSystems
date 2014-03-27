<?php
App::uses('AppController', 'Controller');
/**
 * Planets Controller
 *
 * @property Planet $Planet
 */
class PlanetsController extends AppController {

	private $filepath = '../../../../work/js/data/';
	private $AU = 149597870.700;

	// exports the star system to a json representation
	public function getJSON( $name = null ){

		$this->fields = array(
			'pl_hostname', 
			'pl_name',
			'pl_letter',
			'pl_orbper',
			'pl_orbeccen',
			'pl_massj',
			'pl_masse',
			'pl_orbtper',
			'pl_disc',
			'pl_orbincl',
			'pl_orbsmax',
			'st_teff',
			'st_rad',
			'st_lum',
			'pl_masse',
			'pl_msinie',
			'pl_msinij',
			'pl_massj',
			'pl_eqt',
			'pl_rade'
		);

		$systemsArray = array(
			'name' => '',
			'radius' => '',
			'stars' => array(),
			'satellites' => array()
		);

		if( $name ) {

			$system = $this->Planet->find('all', 
				array(
					'conditions' => array('pl_hostname' => $name),
					'fields' => $this->fields
				)
			);

			if( $system ){

				$i = 0;

				foreach($system as $planet) {


					$systemsArray['name'] = $planet['Planet']['pl_hostname'];
					$systemsArray['radius'] = 100000;

					if( $i == 0 ) {
						$starData = array(
							'name' => $planet['Planet']['pl_hostname'],
							'type' => 'star',
							'temp' => (float)$planet['Planet']['st_teff'],
							'radius' => (float)$planet['Planet']['st_rad'],
							'lum' => (float)$splanet['Planet']['st_lum'],
							'color' => [0,255,255]
						);	
					}					

					$systemsArray['stars'][] = $starData;

					// set up the planet data
					$planetData = array(
						'name' => $planet['Planet']['pl_name'],
						'type' => 'planet',
						'mass' => 5000, // jupiter masses
						'temparature' => 400, // mean surface temparature in Kelvin
						'radius' => 500,
						'semiMajorAxis' => (float)($planet['Planet']['pl_orbsmax'] * $this->AU),
						'eccentricity' => $planet['Planet']['pl_orbeccen'],
						'inclination' => $planet['Planet']['pl_orbincl'],
						'siderealOrbitPeriod' => $planet['Planet']['pl_orbper'],

						// hypotetical
						'color' => [25,128,25]
					);

					$systemsArray['satellites'][] = $planetData;

					$i++;
				}

				$systemsJSON = json_encode($systemsArray);

				$filename = str_replace(' ', '', $name);
				$filename = strtolower($name);

				if(file_put_contents($this->filepath . $filename .'.json', $systemsJSON)){
					$this->Session->setFlash(__('System have been generated!'));
				}

				$this->redirect($this->referer());

			}
		}else{

			// if there was no host name given create all systems

			$systems = $this->Planet->find('all', 
				array(
					'fields' => $this->fields
				)
			);

			$generatedSystems = array();

			foreach($systems as $s) {

				$systemsArray = array(
					'name' => '',
					'radius' => '',
					'stars' => array(),
					'satellites' => array()
				);

				if( !in_array($s['Planet']['pl_hostname'], $generatedSystems) ) {
					echo 'Star not yet rendered <br/>';

					$generatedSystems[] = $s['Planet']['pl_hostname'];
					$systemsArray['name'] = $s['Planet']['pl_hostname'];
					$systemsArray['radius'] = 100000;

					$starData = array(
						'name' => $s['Planet']['pl_hostname'],
						'type' => 'star',
						'temp' => (float)$s['Planet']['st_teff'],
						'radius' => (float)$s['Planet']['st_rad'],
						'lum' => (float)$s['Planet']['st_lum'],
						'color' => [0,255,255]
					);				

					$systemsArray['stars'][] = $starData;
					$systemsArray['satellites'] = array();

					$i = 0;
					foreach($systems as $planet) {

						if( stristr($s['Planet']['pl_hostname'], $planet['Planet']['pl_hostname']) ) {
							// set up the planet data
							$planetData = array(
								'name' => $planet['Planet']['pl_name'],
								'type' => 'planet',
								'masse' => (float)$planet['Planet']['pl_msinie'], // earth masses
								'massinij' => (float)$planet['Planet']['pl_msinij'], // jupiter masses
								'massj' => (float)$planet['Planet']['pl_massj'], // jupiter masses
								'temp' => (float)$planet['Planet']['pl_eqt'], // mean surface temparature in Kelvin
								'radius' => (float)$planet['Planet']['pl_rade'], // earth radii
								'semiMajorAxis' => (float)($planet['Planet']['pl_orbsmax'] * $this->AU),
								'eccentricity' => $planet['Planet']['pl_orbeccen'],
								'inclination' => 0, // $planet['Planet']['pl_orbincl'],
								'siderealOrbitPeriod' => (float)$planet['Planet']['pl_orbper'],

								// hypotetical
								'color' => [25,128,25]
							);

							$systemsArray['satellites'][] = $planetData;

							$i++;
						}
					}

					$systemsJSON = json_encode($systemsArray);

					$filename = str_replace(' ', '', $s['Planet']['pl_hostname']);
					$filename = strtolower($s['Planet']['pl_hostname']);

					if(file_put_contents($this->filepath . $filename .'.json', $systemsJSON)){
						$this->Session->setFlash(__('System have been generated!'));
					}
				}

			}

			//var_dump($generatedSystems);
			exit();
		}

		$this->redirect(array('controller' => 'planets', 'action' => 'index'));
	}


	/**
	 * get all stars that have planets from the database and save as json file
	 */
	public function getStars() {

		$this->fields = array(
			'DISTINCT pl_hostname', // the name of the star
			'pl_pnum', // number of planets in that system
			'ra', // right acsession (in hours)
			'dec', // declination (in hours)
			'st_dist', // distance from eath in parsec
			'st_mass', // the mass of the star in solar masses
			'hd_name', // the hd name of the star
			'hip_name', // the hip name of the star
			'st_colorn' // the color number of the star
		);

		$stars = $this->Planet->find('all', 
			array(
				'fields' => $this->fields
			)
		);


		$starsArray = array();
		foreach($stars as $star) {
			$starArray = array();

			$starArray['pl_hostname'] = $star['Planet']['pl_hostname'];
			$starArray['pl_num'] = $star['Planet']['pl_pnum'];
			$starArray['ra'] = $star['Planet']['ra'];
			$starArray['dec'] = $star['Planet']['dec'];
			$starArray['dist'] = $star['Planet']['st_dist'];
			$starArray['mass'] = $star['Planet']['st_mass'];
			$starArray['hd'] = $star['Planet']['hd_name'];
			$starArray['hip'] = $star['Planet']['hip_name'];
			$starArray['color'] = $star['Planet']['st_colorn'];


			$starsArray[] = $starArray;
		}

		$json = json_encode($starsArray);

		if(file_put_contents($this->filepath . 'stars.json', $json)){
			$this->Session->setFlash(__('Stars have been generated!'));
		}

		$this->redirect($this->referer());
	}


	public function find() {
		$data = $_REQUEST['data'];

		//var_dump( $data );

		if( $data ) {

			// try to find planet names and host names that contain the search key

			$stars = $this->Planet->find('all', 
				array(
					'conditions' => array(
						'Planet.pl_hostname LIKE' => '%'. $data .'%'
					),
					'fields' => $this->fields
				)
			);

			// allow maximum of 20 host names to be found
			$maxCount = 0;

			$starsArray = array();
			foreach($stars as $star) {

				if( $maxCount >= 20 )
					break;

				$starArray = array();

				$starArray['pl_hostname'] = $star['Planet']['pl_hostname'];
				$starArray['pl_num'] = $star['Planet']['pl_pnum'];
				$starArray['ra'] = $star['Planet']['ra'];
				$starArray['dec'] = $star['Planet']['dec'];
				$starArray['dist'] = $star['Planet']['st_dist'];
				$starArray['mass'] = $star['Planet']['st_mass'];
				$starArray['hd'] = $star['Planet']['hd_name'];
				$starArray['hip'] = $star['Planet']['hip_name'];
				$starArray['color'] = $star['Planet']['st_colorn'];

				if( !$this->in_arrayr( $starArray['pl_hostname'], $starsArray ) ){
					$starsArray[] = $starArray;

					$maxCount++;
				}
			}

			// var_dump( $starsArray );
			echo json_encode( $starsArray );
			exit();
		}
	}

	public function in_arrayr($needle, $haystack) {
		foreach ($haystack as $v) {
			if ($needle == $v) return true;
			elseif (is_array($v)) return in_array($needle, $v);
		}
		return false;
	} 

/**
 * index method
 *
 * @return void
 */
	public function index() {
		$this->Planet->recursive = 0;
		$this->set('planets', $this->paginate());
	}

/**
 * view method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		$this->Planet->id = $id;
		if (!$this->Planet->exists()) {
			throw new NotFoundException(__('Invalid planet'));
		}
		$this->set('planet', $this->Planet->read(null, $id));
	}

/**
 * add method
 *
 * @return void
 */
	public function add() {
		if ($this->request->is('post')) {
			$this->Planet->create();
			if ($this->Planet->save($this->request->data)) {
				$this->Session->setFlash(__('The planet has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The planet could not be saved. Please, try again.'));
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
		$this->Planet->id = $id;
		if (!$this->Planet->exists()) {
			throw new NotFoundException(__('Invalid planet'));
		}
		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->Planet->save($this->request->data)) {
				$this->Session->setFlash(__('The planet has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The planet could not be saved. Please, try again.'));
			}
		} else {
			$this->request->data = $this->Planet->read(null, $id);
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
		$this->Planet->id = $id;
		if (!$this->Planet->exists()) {
			throw new NotFoundException(__('Invalid planet'));
		}
		if ($this->Planet->delete()) {
			$this->Session->setFlash(__('Planet deleted'));
			$this->redirect(array('action' => 'index'));
		}
		$this->Session->setFlash(__('Planet was not deleted'));
		$this->redirect(array('action' => 'index'));
	}
}
