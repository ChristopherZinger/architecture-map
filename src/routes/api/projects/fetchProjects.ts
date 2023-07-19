import type { Author, ImgUrl, Project, ProjectFunction, ProjectStyle, Tag } from '@prisma/client';

export const fetchProjects = async (): Promise<ProjectAPI[]> => {
	const projects: [] = await (
		await fetch('/api/projects/', {
			headers: {
				'content-type': 'application/json'
			}
		})
	).json();

	return projects;
};

export type ProjectAPI = Pick<
	Project,
	| 'displayName'
	| 'constructionYearEnd'
	| 'constructionYearStart'
	| 'slug'
	| 'geohash5'
	| 'lat'
	| 'lng'
	| 'description'
> & { functions: Pick<ProjectFunction, 'slug' | 'displayName'>[] } & {
	styles: Pick<ProjectStyle, 'slug' | 'displayName'>[];
} & { tags: Pick<Tag, 'slug' | 'displayName'>[] } & {
	authors: Pick<Author, 'id' | 'fullName'>[];
} & { imgUrls: Pick<ImgUrl, 'url' | 'content' | 'isPrimary'>[] };
