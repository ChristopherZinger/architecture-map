<script lang="ts">
	import { getMap } from '$lib/utils/get-map-utils';
	import Marker from '../leafletComponents/Marker.svelte';
	import Pin from '../svgIcons/Pin.svelte';

	export let height: string = '30px';

	const map = getMap();

	let position = map.getCenter();
	map.on('dragend', () => {
		position = map.getCenter();
	});
	map.on('zoomend', () => {
		position = map.getCenter();
	});

	export { position };
</script>

<Marker latLng={[position.lat, position.lng]}>
	<div slot="icon">
		<Pin {height} />
	</div>
</Marker>
