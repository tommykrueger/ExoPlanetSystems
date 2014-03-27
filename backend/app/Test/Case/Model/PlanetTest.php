<?php
App::uses('Planet', 'Model');

/**
 * Planet Test Case
 *
 */
class PlanetTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'app.planet'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Planet = ClassRegistry::init('Planet');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Planet);

		parent::tearDown();
	}

}
