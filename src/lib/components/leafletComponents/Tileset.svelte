<script lang="ts">
	import { getMap } from '$lib/utils/get-map-utils';
	import L from 'leaflet';

	export let attribution: string;
	export let url: string;
	export let maxZoom: number;

	const map = getMap();

	L.tileLayer(url, {
		maxZoom,
		attribution
	}).addTo(map);
</script>
