import { Role } from '@prisma/client';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './create-new-country/$types.js';

export const load: PageServerLoad = function ({ locals }) {
	const { user } = locals;
	if (user && user.role !== Role.ADMIN) {
		console.error('missing_admin_permissions', { userId: user.id });
		throw error(403, 'admin permissions required');
	}
	return;
};
