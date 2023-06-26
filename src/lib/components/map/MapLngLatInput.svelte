<script lang="ts">
	import Map from '../leafletComponents/Map.svelte';
	import Tileset from '../leafletComponents/Tileset.svelte';
	import MarkerInCenter from './MarkerInCenter.svelte';

	let map: undefined | L.Map;

	let lat = 52.37914937570299;
	let lng = 4.900124223825675;

	const handleLatLngChange = (latLng: [number, number], map: L.Map) => {
		position = latLng;
	};

	$: map && handleLatLngChange([lat, lng], map);

	let position: [number, number] = [lat, lng];
</script>

<div style="max-width: 800px; margin:auto">
	<div style="height: 500px">
		<Map
			onMapReady={(_map) => {
				_map.setView([lat, lng], 7); // removeing this caluses map init error
				map = _map;
			}}
		>
			<Tileset
				url={`https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png`}
				attribution={`Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
				maxZoom={20}
			/>

			<MarkerInCenter
				bind:markerLatLng={position}
				onPositionChange={(p) => {
					lat = p[0];
					lng = p[1];
				}}
			/>
		</Map>
	</div>
	<div class="flex gap-10 my-4">
		<div class="flex gap-2 items-center grow">
			<label for="lat">Lat:</label>
			<input
				class="grow px-4 py-2 border-b-2 border-b-black outline-none"
				type="number"
				placeholder="latitude"
				name="lat"
				value={lat}
				on:input={({ currentTarget: { value } }) => {
					const v = parseFloat(value);
					if (isFinite(v)) {
						lat = v;
					}
				}}
				min={-90}
				max={90}
			/>
		</div>

		<div class="flex gap-2 items-center grow">
			<label for="lng">Lng:</label>
			<input
				class="grow px-4 py-2 border-b-2 border-b-black outline-none"
				type="number"
				name="lng"
				placeholder="longitude"
				value={lng}
				on:input={({ currentTarget: { value } }) => {
					const v = parseFloat(value);
					if (isFinite(v)) {
						lng = v;
					}
				}}
				min={-180}
				max={180}
			/>
		</div>
	</div>
</div>
