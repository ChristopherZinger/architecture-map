import { Role } from '@prisma/client';
import { error } from '@sveltejs/kit';
import z from 'zod';
import { prisma } from '$lib/prisma/prisma-client';

export const actions = {
	createCountry: async ({ request, locals }) => {
		const { user } = locals;

		if (user && user.role !== Role.ADMIN) {
			throw error(403, 'missing_permissions');
		}

		const data = await request.formData();

		const parseResult = z
			.object({
				name: z.string().min(3).trim().toLowerCase(),
				alpha2: z.string().length(2).toUpperCase().trim()
			})
			.safeParse({
				name: data.get('name'),
				alpha2: data.get('alpha2')
			});

		if (!parseResult.success) {
			throw error(400, 'Bad request');
		}

		const {
			data: { name, alpha2 }
		} = parseResult;

		await prisma.country.create({
			data: {
				alpha2,
				displayName: name
			}
		});

		return;
	}
};
