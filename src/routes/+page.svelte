<script lang="ts">
	import Map from '$lib/components/leafletComponents/Map.svelte';
	import Tileset from '$lib/components/leafletComponents/Tileset.svelte';
	import { onMount } from 'svelte';
	import { fetchProjects, type ProjectAPI } from './api/projects/fetchProjects';
	import { feature, featureCollection, type Feature, type Point } from '@turf/helpers';
	import PointCluster from '$lib/components/map/PointCluster.svelte';
	import ProjectSideDrawer from '$lib/components/ProjectSideDrawer.svelte';

	let projects: ProjectAPI[] = [];

	let selectedProject: undefined | ProjectAPI;

	function onClickOnMarker(point: Feature<Point>) {
		const project = projects.find(
			({ lat, lng }) =>
				point.geometry.coordinates[0] === lat && point.geometry.coordinates[1] === lng
		);
		if (project && selectedProject !== project) {
			selectedProject = project;
		} else if (project == selectedProject) {
			selectedProject = undefined;
		}
	}

	onMount(async () => {
		projects = await fetchProjects();
	});
</script>

<div class="flex-grow relative border">
	{#if selectedProject}
		<ProjectSideDrawer
			onClose={() => {
				selectedProject = undefined;
			}}
			project={selectedProject}
		/>
	{/if}
	<Map>
		<Tileset
			url={`https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png`}
			attribution={`Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
			maxZoom={20}
		/>

		<PointCluster
			{onClickOnMarker}
			pointsFeatureCollection={featureCollection(
				projects.map((p) =>
					feature({
						type: 'Point',
						coordinates: [p.lat, p.lng]
					})
				)
			)}
			selectedFeature={selectedProject || null}
		/>
	</Map>
</div>
