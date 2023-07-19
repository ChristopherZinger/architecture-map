<script lang="ts">
	import turfCluster from '@turf/clusters-kmeans';
	import { groupBy } from 'lodash';
	import { getMap } from '$lib/utils/get-map-utils';
	import {
		featureCollection,
		type Feature,
		type Point,
		type FeatureCollection
	} from '@turf/helpers';
	import ClusterMarker from './ClusterMarker.svelte';
	import bbox from '@turf/bbox';
	import Marker from '../leafletComponents/Marker.svelte';
	import type { ProjectAPI } from '../../../routes/api/projects/fetchProjects';

	export let pointsFeatureCollection: FeatureCollection<Point>;
	export let onClickOnMarker: (i: Feature<Point>) => void;
	export let selectedFeature: null | ProjectAPI;

	const map = getMap();
	let zoom = map.getZoom();
	const SHOW_ALL_POINTS_ZOOM_LEVEL = 16;

	function getMarkerColor(selectedFeature: ProjectAPI | null, feature: Feature<Point>): string {
		if (
			selectedFeature?.lat === feature.geometry.coordinates[0] &&
			selectedFeature?.lng === feature.geometry.coordinates[1]
		) {
			return 'coral';
		}
		return clusterColor;
	}
	const clusterColor = '#464646';

	type ClusterWithPoints = {
		centroid: [number, number] | undefined;
		points: Feature<
			Point,
			{
				[name: string]: any;
			} & {
				cluster?: number | undefined;
				centroid?: [number, number] | undefined;
			}
		>[];
	}[];

	map.on('dragend', () => {
		clusters = getClusteredPointsToDisplay(
			getPointsInsideMapBbox(pointsFeatureCollection.features)
		);
		pointsInsideMapBbox = getPointsInsideMapBbox(pointsFeatureCollection.features);
	});
	map.on('zoomend', () => {
		clusters = getClusteredPointsToDisplay(
			getPointsInsideMapBbox(pointsFeatureCollection.features)
		);
		zoom = map.getZoom();
		pointsInsideMapBbox = getPointsInsideMapBbox(pointsFeatureCollection.features);
	});

	function getPointsWithClusterInfo(points: FeatureCollection<Point>) {
		return turfCluster(points, {});
	}

	function getPointsInsideMapBbox(points: Feature<Point>[]) {
		return points.filter(({ geometry: { coordinates } }) => {
			const [lat, lng] = coordinates;
			return map.getBounds().contains([lat, lng]);
		});
	}

	function getClusteredPointsToDisplay(points: Feature<Point>[]): ClusterWithPoints {
		if (!points.length) {
			return [];
		}
		const { features } = getPointsWithClusterInfo(featureCollection(points));

		const res = Object.values(groupBy(features, (f) => f.properties.cluster)).reduce(
			(acc: ClusterWithPoints, points): ClusterWithPoints => {
				return [
					...acc,
					{
						centroid: points[0].properties.centroid || undefined,
						points
					}
				];
			},
			[]
		);

		return res;
	}

	$: clusters = getClusteredPointsToDisplay(
		getPointsInsideMapBbox(pointsFeatureCollection.features)
	);
	$: pointsInsideMapBbox = getPointsInsideMapBbox(pointsFeatureCollection.features);
</script>

{#if clusters.length > 1}
	{#each clusters as { points: clusterPoints, centroid }}
		{#if clusterPoints.length > 3 && centroid && zoom < SHOW_ALL_POINTS_ZOOM_LEVEL}
			<ClusterMarker
				{centroid}
				nrOfPoints={clusterPoints.length}
				color={clusterColor}
				onClick={() => {
					const [a, b, c, d] = bbox(featureCollection(clusterPoints));
					map.fitBounds([
						[a, b],
						[c, d]
					]);
				}}
			/>
		{:else}
			{#each clusterPoints as point}
				{@const [x, y] = point.geometry.coordinates}
				{#if x && y}
					<Marker
						onClick={() => onClickOnMarker(point)}
						latLng={[x, y]}
						color={getMarkerColor(selectedFeature, point)}
					/>
				{/if}
			{/each}
		{/if}
	{/each}
{:else}
	{#each pointsInsideMapBbox as point}
		{@const [x, y] = point.geometry.coordinates}
		{#if x && y}
			<Marker
				latLng={[x, y]}
				onClick={() => onClickOnMarker(point)}
				color={getMarkerColor(selectedFeature, point)}
			/>
		{/if}
	{/each}
{/if}
