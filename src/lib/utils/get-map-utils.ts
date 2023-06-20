import { getContext } from 'svelte';

export const mapKey = Symbol();
export const getMap = () => {
	const { getMap } = getContext<{ getMap: () => L.Map }>(mapKey);
	return getMap();
};
