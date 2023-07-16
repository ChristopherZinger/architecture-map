<script lang="ts">
	import L from 'leaflet';
	import { getMap } from '$lib/utils/get-map-utils';
	import { onDestroy } from 'svelte';
	import Pin from '../svgIcons/Pin.svelte';

	export let latLng: [number, number];
	export let onClick: (() => void) | undefined = undefined;
	export let title: string | undefined = undefined;
	export let color: string = '#464646';

	const map = getMap();
	const marker = L.marker(latLng, {
		title
	}).addTo(map);
	let defaultIconNode: HTMLElement | undefined;
	let slotIconNode: undefined | HTMLElement;

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

	function setOnClick(onClick: () => void) {
		marker.addEventListener('click', onClick);
	}

	onDestroy(() => {
		map.removeLayer(marker);
	});

	$: onClick && setOnClick(onClick);

	$: setMarkerLatLng(latLng);
	$: if (slotIconNode || defaultIconNode) {
		if ($$slots.icon && slotIconNode) {
			setIcon(slotIconNode);
		} else if (defaultIconNode) {
			setIcon(defaultIconNode);
		}
	}
</script>

<div bind:this={slotIconNode} class="icon">
	<slot name="icon">
		<div class="icon" bind:this={defaultIconNode}>
			<Pin {color} />
		</div>
	</slot>
</div>

<style>
	.icon {
		display: inline-block;
		box-sizing: border-box;
		height: 20px;
	}
</style>
