<script lang="ts">
	import { mapKey } from '$lib/utils/get-map-utils';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import { setContext } from 'svelte';

	let mapComponent: HTMLElement | undefined;
	let map: L.Map | undefined;

	export let onMapReady: ((map: L.Map) => void) | undefined = undefined;

	const mapInitialCenter: [number, number] = [48.93715850426397, 7.4551722494402135];

	function initializeMap(mapComponent: HTMLElement) {
		map = L.map(mapComponent);

		if (onMapReady) {
			onMapReady(map);
		} else {
			map.setView(mapInitialCenter, 5);
			map.setMinZoom(3);
		}
	}

	setContext(mapKey, {
		getMap: () => map
	});

	$: mapComponent && initializeMap(mapComponent);
	$: isReady = mapComponent && map;
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
		integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
		crossorigin=""
	/>
</svelte:head>

<div id="map" bind:this={mapComponent} style="z-index:0;">
	{#if isReady}
		<slot />
	{/if}
</div>

<style>
	#map {
		width: 100%;
		height: 100%;
	}
</style>
