import { ImgContent, Role } from '@prisma/client';
import { error } from '@sveltejs/kit';
import z from 'zod';
import { prisma } from '$lib/prisma/prisma-client';
import { makeSlug } from '$lib/utils/slugify-utils.js';
import { pointToGeohash } from '$lib/utils/geohash-utils.js';

export const actions = {
	createProject: async ({ request, locals }) => {
		const { user } = locals;

		if (user && user.role !== Role.ADMIN) {
			throw error(403, 'missing_permissions');
		}

		const formData = await request.formData();

		const rawData = {
			lat: formData.get('lat'),
			lng: formData.get('lng'),
			displayName: formData.get('displayName'),
			authors: formData.getAll('authors'),
			constructionStart: formData.get('constructionStart'),
			constructionEnd: formData.get('constructionEnd'),
			projectFunctions: formData.getAll('project-function'),
			projectStyles: formData.getAll('project-style'),
			tags: formData.getAll('tag'),
			imgsJson: formData.get('imgs-json')
		};

		if (!rawData.lat || !rawData.lng || !rawData.imgsJson) {
			throw error(400, 'missing lat, lng, or imgsJson');
		}

		const imgJson = JSON.parse(rawData.imgsJson.toString());

		const parseResult = z
			.object({
				lat: z.number().min(-90).max(90),
				lng: z.number().min(-180).max(180),
				displayName: z.string(),
				authorIds: z.array(z.number()), // author id
				constructionStart: z.number().min(0).max(new Date().getFullYear()).nullable(),
				constructionEnd: z.number().min(0).max(new Date().getFullYear()).nullable(),
				projectFunctionSlugs: z.array(z.string()),
				projectStyleSlugs: z.array(z.string()),
				tagSlugs: z.array(z.string()),
				imgs: z.array(
					z.object({
						url: z.string(),
						type: z.nativeEnum(ImgContent),
						isPrimary: z.boolean()
					})
				)
			})
			.safeParse({
				lat: parseFloat(rawData.lat.toString()),
				lng: parseFloat(rawData.lng.toString()),
				displayName: rawData.displayName,
				authorIds: rawData.authors.map((i) => parseInt(i.toString())),
				constructionStart: rawData.constructionStart
					? parseInt(rawData.constructionStart.toString())
					: null,
				constructionEnd: rawData.constructionEnd
					? parseInt(rawData.constructionEnd.toString())
					: null,
				projectFunctionSlugs: rawData.projectFunctions,
				projectStyleSlugs: rawData.projectStyles,
				tagSlugs: rawData.tags,
				imgs: imgJson.map((img: any) => ({
					type: img.type,
					url: img.url,
					isPrimary: Boolean(img.isPrimary)
				}))
			});

		if (!parseResult.success) {
			throw error(400, { message: parseResult.error.message });
		}

		const { data } = parseResult;

		const geohash = pointToGeohash({
			lat: data.lat,
			lng: data.lng
		});

		try {
			await prisma.project.create({
				data: {
					displayName: data.displayName,
					lng: data.lng,
					lat: data.lat,
					slug: makeSlug(data.displayName),
					constructionYearStart: data.constructionStart,
					constructionYearEnd: data.constructionEnd,
					geohash5: geohash,

					tags: {
						connect: data.tagSlugs.map((slug) => ({ slug }))
					},
					functions: {
						connect: data.projectFunctionSlugs.map((slug) => ({ slug }))
					},
					styles: {
						connect: data.projectStyleSlugs.map((slug) => ({ slug }))
					},
					authors: {
						connect: data.authorIds.map((id) => ({ id }))
					},
					imgUrls: {
						create: data.imgs.map((img) => ({
							url: img.url,
							content: img.type,
							isPrimary: img.isPrimary
						}))
					}
				}
			});
		} catch (err) {
			throw error(500, {
				message: 'Failed to create project: ' + err.toString()
			});
		}

		return;
	}
};
