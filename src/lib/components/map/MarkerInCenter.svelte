<script lang="ts">
	import { getMap } from '$lib/utils/get-map-utils';
	import { onMount } from 'svelte';
	import Marker from '../leafletComponents/Marker.svelte';
	import Pin from '../svgIcons/Pin.svelte';

	export let height: string = '30px';
	export let markerLatLng: [number, number];
	export let onPositionChange: (latLng: [number, number]) => void;

	const map = getMap();

	function positionToLngLat(p: L.LatLng): [number, number] {
		return [p.lat, p.lng];
	}

	function setMarkerLatLng(latLng: [number, number]) {
		if (latLng[0] !== markerLatLng[0] || latLng[1] !== markerLatLng[1]) {
			markerLatLng = latLng;
		}
	}

	function handlePositionChange(latLng: [number, number]) {
		onPositionChange(latLng);

		const { lat, lng } = map.getCenter();
		if (latLng[0] !== lat || latLng[1] !== lng) {
			map.setView(latLng);
		}
	}

	map.on('drag', () => {
		const { lat, lng } = map.getCenter();
		setMarkerLatLng([lat, lng]);
	});
	map.on('zoom', () => {
		const { lat, lng } = map.getCenter();
		setMarkerLatLng([lat, lng]);
	});

	onMount(() => {
		markerLatLng = positionToLngLat(map.getCenter());
	});

	$: handlePositionChange(markerLatLng);
</script>

<Marker latLng={markerLatLng}>
	<div slot="icon">
		<Pin {height} />
	</div>
</Marker>
