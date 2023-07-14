import { Role } from '@prisma/client';
import { error } from '@sveltejs/kit';
import z from 'zod';
import { prisma } from '$lib/prisma/prisma-client';
import { makeSlug } from '$lib/utils/slugify-utils.js';

export const actions = {
	createProjectFunction: async ({ request, locals }) => {
		const { user } = locals;

		if (user && user.role !== Role.ADMIN) {
			throw error(403, 'missing_permissions');
		}

		const data = await request.formData();

		const parseResult = z
			.object({
				displayName: z.string().min(3).trim().toLowerCase()
			})
			.safeParse({
				displayName: data.get('displayName')
			});

		if (!parseResult.success) {
			throw error(400, 'Bad request');
		}

		const {
			data: { displayName }
		} = parseResult;

		const slug = makeSlug(displayName);

		const existingProjectFunction = await prisma.projectFunction.findFirst({
			where: {
				slug
			}
		});

		if (existingProjectFunction) {
			throw error(400, 'Function already exists');
		}

		await prisma.projectFunction.create({
			data: {
				displayName,
				slug
			}
		});

		return;
	}
};
