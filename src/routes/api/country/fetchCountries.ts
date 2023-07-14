import type { Country } from '@prisma/client';

export const fetchCountries = async (): Promise<CountryAPI[]> => {
	const countries: Country[] = await (
		await fetch('/api/country/', {
			headers: {
				'content-type': 'application/json'
			}
		})
	).json();

	return countries;
};

export type CountryAPI = Pick<Country, 'alpha2' | 'displayName'>;
