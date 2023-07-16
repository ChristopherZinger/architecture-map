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
> &
	Pick<ProjectFunction, 'slug' | 'displayName'>[] &
	Pick<ProjectStyle, 'slug' | 'displayName'>[] &
	Pick<Tag, 'slug' | 'displayName'>[] &
	Pick<Author, 'id' | 'fullName'>[] &
	Pick<ImgUrl, 'url' | 'content' | 'isPrimary'>[];
