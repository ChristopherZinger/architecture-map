import type { Author } from '@prisma/client';

export const fetchAuthors = async (): Promise<Author[]> => {
	const authors: Author[] = await (
		await fetch('/api/authors/', {
			headers: {
				'content-type': 'application/json'
			}
		})
	).json();

	return authors;
};

export type AuthorAPI = Pick<Author, 'fullName' | 'id'>;
