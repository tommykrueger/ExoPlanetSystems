<?php
App::uses('Phlplanet', 'Model');

/**
 * Phlplanet Test Case
 *
 */
class PhlplanetTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'app.phlplanet'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Phlplanet = ClassRegistry::init('Phlplanet');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Phlplanet);

		parent::tearDown();
	}

}
