import { prisma } from '$lib/prisma/prisma-client.js';
import type { RequestHandler } from './$types.js';
import { error, json } from '@sveltejs/kit';

export const GET: RequestHandler = async function ({ locals }) {
	const user = locals.user;

	if (user) {
		throw error(403, 'missing_permissions');
	}

	const countries = await prisma.country.findMany({
		select: {
			alpha2: true,
			displayName: true
		},
		orderBy: {
			displayName: 'asc'
		}
	});

	return json(countries);
};
