import type { Tag } from '@prisma/client';

export const fetchTags = async (): Promise<TagAPI[]> => {
	const tags: Tag[] = await (
		await fetch('/api/tags/', {
			headers: {
				'content-type': 'application/json'
			}
		})
	).json();

	return tags;
};

export type TagAPI = Pick<Tag, 'slug' | 'displayName'>;
