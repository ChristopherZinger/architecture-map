import { prisma } from '$lib/prisma/prisma-client.js';
import type { RequestHandler } from './$types.js';
import { error, json } from '@sveltejs/kit';

export const GET: RequestHandler = async function ({ locals }) {
	const user = locals.user;

	if (user) {
		throw error(403, 'missing_permissions');
	}

	const functions = await prisma.projectFunction.findMany({
		select: {
			displayName: true,
			slug: true
		},
		orderBy: {
			displayName: 'asc'
		}
	});

	return json(functions);
};
