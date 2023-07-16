<script lang="ts">
	import Map from '$lib/components/leafletComponents/Map.svelte';
	import Tileset from '$lib/components/leafletComponents/Tileset.svelte';
	import { onMount } from 'svelte';
	import { fetchProjects, type ProjectAPI } from './api/projects/fetchProjects';
	import { feature, featureCollection } from '@turf/helpers';
	import PointCluster from '$lib/components/map/PointCluster.svelte';

	let projects: ProjectAPI[] = [];

	onMount(async () => {
		projects = await fetchProjects();
	});
</script>

<div class="flex-grow border">
	<Map>
		<Tileset
			url={`https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png`}
			attribution={`Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
			maxZoom={20}
		/>

		<PointCluster
			pointsFeatureCollection={featureCollection(
				projects.map((p) =>
					feature({
						type: 'Point',
						coordinates: [p.lat, p.lng]
					})
				)
			)}
		/>
	</Map>
</div>
