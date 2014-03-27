<div class="phlplanets index">
	<h2><?php echo __('Phlplanets'); ?></h2>
	<table cellpadding="0" cellspacing="0">
	<tr>
			<th><?php echo $this->Paginator->sort('P. Name'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Name Kepler'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Name KOI'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Zone Class'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Mass Class'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Composition Class'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Atmosphere Class'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Habitable Class'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Min Mass'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Mass'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Max Mass'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Radius'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Density'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Gravity'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Esc Vel'); ?></th>
			<th><?php echo $this->Paginator->sort('P. SFlux Min'); ?></th>
			<th><?php echo $this->Paginator->sort('P. SFlux Mean'); ?></th>
			<th><?php echo $this->Paginator->sort('P. SFlux Max'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Teq Min'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Teq Mean'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Teq Max'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Ts Min'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Ts Mean'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Ts Max'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Surf Press'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Mag'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Appar Size'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Period'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Sem Major Axis'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Eccentricity'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Mean Distance'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Inclination'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Omega'); ?></th>
			<th><?php echo $this->Paginator->sort('S. Name'); ?></th>
			<th><?php echo $this->Paginator->sort('S. Name HD'); ?></th>
			<th><?php echo $this->Paginator->sort('S. Name HIP'); ?></th>
			<th><?php echo $this->Paginator->sort('S. Constellation'); ?></th>
			<th><?php echo $this->Paginator->sort('S. Type'); ?></th>
			<th><?php echo $this->Paginator->sort('S. Mass'); ?></th>
			<th><?php echo $this->Paginator->sort('S. Radius'); ?></th>
			<th><?php echo $this->Paginator->sort('S. Teff'); ?></th>
			<th><?php echo $this->Paginator->sort('S. Luminosity'); ?></th>
			<th><?php echo $this->Paginator->sort('S. Fe/H'); ?></th>
			<th><?php echo $this->Paginator->sort('S. Age'); ?></th>
			<th><?php echo $this->Paginator->sort('S. Appar Mag'); ?></th>
			<th><?php echo $this->Paginator->sort('S. Distance'); ?></th>
			<th><?php echo $this->Paginator->sort('S. RA'); ?></th>
			<th><?php echo $this->Paginator->sort('S. DEC'); ?></th>
			<th><?php echo $this->Paginator->sort('S. Mag from Planet'); ?></th>
			<th><?php echo $this->Paginator->sort('S. Size from Planet'); ?></th>
			<th><?php echo $this->Paginator->sort('S. No. Planets'); ?></th>
			<th><?php echo $this->Paginator->sort('S. No. Planets HZ'); ?></th>
			<th><?php echo $this->Paginator->sort('S. Hab Zone Min'); ?></th>
			<th><?php echo $this->Paginator->sort('S. Hab Zone Max'); ?></th>
			<th><?php echo $this->Paginator->sort('P. HZD'); ?></th>
			<th><?php echo $this->Paginator->sort('P. HZC'); ?></th>
			<th><?php echo $this->Paginator->sort('P. HZA'); ?></th>
			<th><?php echo $this->Paginator->sort('P. HZI'); ?></th>
			<th><?php echo $this->Paginator->sort('P. SPH'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Int ESI'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Surf ESI'); ?></th>
			<th><?php echo $this->Paginator->sort('P. ESI'); ?></th>
			<th><?php echo $this->Paginator->sort('S. HabCat'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Habitable'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Hab Moon'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Confirmed'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Disc. Method'); ?></th>
			<th><?php echo $this->Paginator->sort('P. Disc. Year'); ?></th>
			<th class="actions"><?php echo __('Actions'); ?></th>
	</tr>
	<?php
	foreach ($phlplanets as $phlplanet): ?>
	<tr>
		<td><?php echo h($phlplanet['Phlplanet']['P. Name']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Name Kepler']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Name KOI']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Zone Class']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Mass Class']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Composition Class']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Atmosphere Class']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Habitable Class']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Min Mass']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Mass']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Max Mass']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Radius']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Density']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Gravity']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Esc Vel']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. SFlux Min']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. SFlux Mean']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. SFlux Max']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Teq Min']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Teq Mean']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Teq Max']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Ts Min']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Ts Mean']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Ts Max']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Surf Press']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Mag']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Appar Size']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Period']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Sem Major Axis']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Eccentricity']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Mean Distance']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Inclination']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Omega']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. Name']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. Name HD']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. Name HIP']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. Constellation']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. Type']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. Mass']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. Radius']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. Teff']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. Luminosity']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. Fe/H']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. Age']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. Appar Mag']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. Distance']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. RA']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. DEC']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. Mag from Planet']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. Size from Planet']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. No. Planets']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. No. Planets HZ']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. Hab Zone Min']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. Hab Zone Max']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. HZD']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. HZC']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. HZA']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. HZI']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. SPH']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Int ESI']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Surf ESI']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. ESI']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['S. HabCat']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Habitable']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Hab Moon']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Confirmed']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Disc. Method']); ?>&nbsp;</td>
		<td><?php echo h($phlplanet['Phlplanet']['P. Disc. Year']); ?>&nbsp;</td>
		<!--
		<td class="actions">
			<?php //echo $this->Html->link(__('View'), array('action' => 'view', $phlplanet['Phlplanet']['id'])); ?>
			<?php //echo $this->Html->link(__('Edit'), array('action' => 'edit', $phlplanet['Phlplanet']['id'])); ?>
			<?php //echo $this->Form->postLink(__('Delete'), array('action' => 'delete', $phlplanet['Phlplanet']['id']), null, __('Are you sure you want to delete # %s?', $phlplanet['Phlplanet']['id'])); ?>
		</td>
		-->
	</tr>
<?php endforeach; ?>
	</table>
	<p>
	<?php
	echo $this->Paginator->counter(array(
	'format' => __('Page {:page} of {:pages}, showing {:current} records out of {:count} total, starting on record {:start}, ending on {:end}')
	));
	?>	</p>

	<div class="paging">
	<?php
		echo $this->Paginator->prev('< ' . __('previous'), array(), null, array('class' => 'prev disabled'));
		echo $this->Paginator->numbers(array('separator' => ''));
		echo $this->Paginator->next(__('next') . ' >', array(), null, array('class' => 'next disabled'));
	?>
	</div>
</div>

<div class="actions">
	<h3><?php echo __('Actions'); ?></h3>
	<ul>
		<li>
			<?php echo $this->Html->link(__('Export Planets'), array('action' => 'exportAll')); ?>
		</li>
		<li>
			<?php echo $this->Html->link(__('Export Stars'), array('action' => 'getStars')); ?>
		</li>
		<li>
			<?php echo $this->Html->link(__('Export Planet Stats'), array('action' => 'getPlanetClasses')); ?>
		</li>
		<li>
			<?php echo $this->Html->link(__('Export General Statistics'), array('action' => 'getStatistics')); ?>
		</li>
		
	</ul>
</div>
