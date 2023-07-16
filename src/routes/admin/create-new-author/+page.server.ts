import { Role } from '@prisma/client';
import { error } from '@sveltejs/kit';
import z from 'zod';
import { prisma } from '$lib/prisma/prisma-client';

export const actions = {
	createAuthor: async ({ request, locals }) => {
		const { user } = locals;

		if (user && user.role !== Role.ADMIN) {
			throw error(403, 'missing_permissions');
		}

		const formData = await request.formData();
		const rawBirthDate = formData.get('birthDate');
		const rawDeathDate = formData.get('deathDate');
		const rawCityId = formData.get('cityId');

		const unsafeDate = {
			fullName: formData.get('fullName'),
			akas: formData.getAll('akas'),
			info: formData.get('info'),
			birthDate: rawBirthDate ? new Date(rawBirthDate.toString()) : null,
			deathDate: rawDeathDate ? new Date(rawDeathDate.toString()) : null,
			cityId: rawCityId ? parseInt(rawCityId.toString()) : null
		};

		const parseResult = z
			.object({
				fullName: z.string().min(2).trim(),
				akas: z.array(z.string().min(2).trim()),
				birthDate: z.date(),
				deathDate: z.date().nullable(),
				info: z.string().trim(),
				cityId: z.number()
			})
			.safeParse(unsafeDate);

		if (!parseResult.success) {
			console.log(parseResult.error);
			throw error(400, 'Bad request');
		}

		const { data } = parseResult;

		const city = await prisma.city.findUnique({
			where: {
				id: data.cityId
			},
			select: {
				id: true,
				country: {
					select: {
						alpha2: true
					}
				}
			}
		});

		if (!city) {
			throw error(403, 'Missing city for id');
		}

		await prisma.author.create({
			data: {
				fullName: data.fullName,
				birthDate: data.birthDate,
				deathDate: data.deathDate,
				info: data.info,
				aka: data.akas,
				birthCity: {
					connect: {
						id: data.cityId
					}
				},
				birthCountry: {
					connect: {
						alpha2: city.country.alpha2
					}
				}
			}
		});

		return;
	}
};
