<script lang="ts">
	import Marker from '../leafletComponents/Marker.svelte';
	import ClusterIcon from '../svgIcons/ClusterIcon.svelte';

	export let centroid: [number, number];
	export let nrOfPoints: number;
	export let color: string;
	export let onClick: (() => void) | undefined = undefined;
</script>

<Marker latLng={centroid} {onClick}>
	<div slot="icon">
		<ClusterIcon displayedNumber={nrOfPoints} {color} />
	</div>
</Marker>
