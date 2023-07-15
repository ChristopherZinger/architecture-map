import { Role } from '@prisma/client';
import { error } from '@sveltejs/kit';
import z from 'zod';
import { prisma } from '$lib/prisma/prisma-client';
import { makeSlug } from '$lib/utils/slugify-utils.js';

export const actions = {
	createCity: async ({ request, locals }) => {
		const { user } = locals;

		if (user && user.role !== Role.ADMIN) {
			throw error(403, 'missing_permissions');
		}

		const data = await request.formData();

		const parseResult = z
			.object({
				displayName: z.string().min(2).trim().toLowerCase(),
				alpha2: z.string().length(2).toUpperCase().trim(),
				slug: z.string().min(1).trim()
			})
			.safeParse({
				displayName: data.get('name'),
				alpha2: data.get('alpha2'),
				slug: data.get('slug')
			});

		if (!parseResult.success) {
			throw error(400, 'Bad request');
		}

		const {
			data: { displayName, slug, alpha2 }
		} = parseResult;

		const [existingCity, country] = await Promise.all([
			await prisma.city.findFirst({
				where: {
					slug: slug
				}
			}),
			await prisma.country.findFirst({
				where: {
					alpha2
				}
			})
		]);

		if (existingCity) {
			throw error(400, 'slug has to be unique');
		}

		if (!country) {
			throw error(400, 'no country with this alpha code');
		}

		await prisma.city.create({
			data: {
				displayName,
				slug: makeSlug(slug),
				country: {
					connect: { id: country.id }
				}
			}
		});

		return;
	}
};
