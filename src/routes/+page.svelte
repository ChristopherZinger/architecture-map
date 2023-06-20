<script lang="ts">
	import Map from '$lib/components/leafletComponents/Map.svelte';
	import Tileset from '$lib/components/leafletComponents/Tileset.svelte';
</script>

<div class="flex-grow border">
	<Map>
		<Tileset
			url={`https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png`}
			attribution={`Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
			maxZoom={20}
		/>
	</Map>
</div>
