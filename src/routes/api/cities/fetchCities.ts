import type { City, Country } from '@prisma/client';

export const fetchCities = async (): Promise<CityAPI[]> => {
	const cities: CityAPI[] = await (
		await fetch('/api/cities/', {
			headers: {
				'content-type': 'application/json'
			}
		})
	).json();

	return cities;
};

export type CityAPI = Pick<City, 'displayName' | 'slug'> & {
	country: Pick<Country, 'displayName'>;
};
