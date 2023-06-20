<script lang="ts">
	import L from 'leaflet';
	import { getMap } from '$lib/utils/get-map-utils';
	import { onDestroy } from 'svelte';

	export let latLng: [number, number];
	export let onClick: (() => void) | undefined = undefined;
	export let title: string | undefined = undefined;

	const map = getMap();
	const marker = L.marker(latLng, {
		title
	}).addTo(map);
	let iconNode: HTMLElement | undefined;

	function setMarkerLatLng(latLng: [number, number]) {
		marker.setLatLng(latLng);
	}

	function setIcon(iconNode: HTMLElement) {
		const icon = L.divIcon({
			html: iconNode,
			className: '',
			iconSize: [iconNode.clientWidth, iconNode.clientHeight],
			iconAnchor: [iconNode.clientWidth / 2, iconNode.clientHeight / 2]
		});

		marker.setIcon(icon);
	}

	onDestroy(() => {
		map.removeLayer(marker);
	});

	$: if (onClick) {
		marker.addEventListener('click', onClick);
	}

	$: setMarkerLatLng(latLng);
	$: if ($$slots.icon && iconNode) {
		setIcon(iconNode);
	}
</script>

<div class="icon" bind:this={iconNode}>
	<slot name="icon" />
</div>

<style>
	.icon {
		display: inline-block;
		box-sizing: border-box;
	}
</style>
