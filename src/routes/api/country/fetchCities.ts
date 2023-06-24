export const fetchCountries = async () => {
	const cities: Country[] = await (
		await fetch('/api/country/', {
			headers: {
				'content-type': 'application/json'
			}
		})
	).json();

	return cities;
};

export type Country = {
	alpha2: string;
	displayName: string;
};
