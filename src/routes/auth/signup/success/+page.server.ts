import { error } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}
};
