<div class="phlplanets form">
<?php echo $this->Form->create('Phlplanet'); ?>
	<fieldset>
		<legend><?php echo __('Add Phlplanet'); ?></legend>
	<?php
		echo $this->Form->input('P. Name');
		echo $this->Form->input('P. Name Kepler');
		echo $this->Form->input('P. Name KOI');
		echo $this->Form->input('P. Zone Class');
		echo $this->Form->input('P. Mass Class');
		echo $this->Form->input('P. Composition Class');
		echo $this->Form->input('P. Atmosphere Class');
		echo $this->Form->input('P. Habitable Class');
		echo $this->Form->input('P. Min Mass');
		echo $this->Form->input('P. Mass');
		echo $this->Form->input('P. Max Mass');
		echo $this->Form->input('P. Radius');
		echo $this->Form->input('P. Density');
		echo $this->Form->input('P. Gravity');
		echo $this->Form->input('P. Esc Vel');
		echo $this->Form->input('P. SFlux Min');
		echo $this->Form->input('P. SFlux Mean');
		echo $this->Form->input('P. SFlux Max');
		echo $this->Form->input('P. Teq Min');
		echo $this->Form->input('P. Teq Mean');
		echo $this->Form->input('P. Teq Max');
		echo $this->Form->input('P. Ts Min');
		echo $this->Form->input('P. Ts Mean');
		echo $this->Form->input('P. Ts Max');
		echo $this->Form->input('P. Surf Press');
		echo $this->Form->input('P. Mag');
		echo $this->Form->input('P. Appar Size');
		echo $this->Form->input('P. Period');
		echo $this->Form->input('P. Sem Major Axis');
		echo $this->Form->input('P. Eccentricity');
		echo $this->Form->input('P. Mean Distance');
		echo $this->Form->input('P. Inclination');
		echo $this->Form->input('P. Omega');
		echo $this->Form->input('S. Name');
		echo $this->Form->input('S. Name HD');
		echo $this->Form->input('S. Name HIP');
		echo $this->Form->input('S. Constellation');
		echo $this->Form->input('S. Type');
		echo $this->Form->input('S. Mass');
		echo $this->Form->input('S. Radius');
		echo $this->Form->input('S. Teff');
		echo $this->Form->input('S. Luminosity');
		echo $this->Form->input('S. Fe/H');
		echo $this->Form->input('S. Age');
		echo $this->Form->input('S. Appar Mag');
		echo $this->Form->input('S. Distance');
		echo $this->Form->input('S. RA');
		echo $this->Form->input('S. DEC');
		echo $this->Form->input('S. Mag from Planet');
		echo $this->Form->input('S. Size from Planet');
		echo $this->Form->input('S. No. Planets');
		echo $this->Form->input('S. No. Planets HZ');
		echo $this->Form->input('S. Hab Zone Min');
		echo $this->Form->input('S. Hab Zone Max');
		echo $this->Form->input('P. HZD');
		echo $this->Form->input('P. HZC');
		echo $this->Form->input('P. HZA');
		echo $this->Form->input('P. HZI');
		echo $this->Form->input('P. SPH');
		echo $this->Form->input('P. Int ESI');
		echo $this->Form->input('P. Surf ESI');
		echo $this->Form->input('P. ESI');
		echo $this->Form->input('S. HabCat');
		echo $this->Form->input('P. Habitable');
		echo $this->Form->input('P. Hab Moon');
		echo $this->Form->input('P. Confirmed');
		echo $this->Form->input('P. Disc. Method');
		echo $this->Form->input('P. Disc. Year');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit')); ?>
</div>
<div class="actions">
	<h3><?php echo __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('List Phlplanets'), array('action' => 'index')); ?></li>
	</ul>
</div>
