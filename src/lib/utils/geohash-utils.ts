import Geohash from 'latlon-geohash';

export function pointToGeohash(point: { lat: number; lng: number }): string {
	return Geohash.encode(point.lat, point.lng, 5);
}
