import { prisma } from '$lib/prisma/prisma-client.js';
import type { RequestHandler } from './$types.js';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async function () {
	const projects = await prisma.project.findMany({
		select: {
			lat: true,
			lng: true,
			displayName: true,
			constructionYearEnd: true,
			constructionYearStart: true,
			slug: true,
			geohash5: true,
			functions: {
				select: {
					slug: true,
					displayName: true
				}
			},
			styles: {
				select: {
					slug: true,
					displayName: true
				}
			},
			tags: {
				select: {
					slug: true,
					displayName: true
				}
			},
			authors: {
				select: {
					id: true,
					fullName: true
				}
			},
			imgUrls: {
				select: {
					isPrimary: true,
					url: true,
					content: true,
					credits: true
				}
			},
			description: true
		}
	});

	return json(projects);
};
