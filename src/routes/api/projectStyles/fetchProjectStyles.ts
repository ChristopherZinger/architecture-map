import type { ProjectStyle } from '@prisma/client';

export const fetchProjecStyles = async (): Promise<ProjectStyleAPI[]> => {
	const projectStyles: [] = await (
		await fetch('/api/projectStyles/', {
			headers: {
				'content-type': 'application/json'
			}
		})
	).json();

	return projectStyles;
};

export type ProjectStyleAPI = Pick<ProjectStyle, 'displayName' | 'slug'>;
