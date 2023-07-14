import type { ProjectFunction } from '@prisma/client';

export const fetchProjecFunctions = async (): Promise<ProjectFunctionAPI[]> => {
	const projectFunctions: [] = await (
		await fetch('/api/projectFunctions/', {
			headers: {
				'content-type': 'application/json'
			}
		})
	).json();

	return projectFunctions;
};

export type ProjectFunctionAPI = Pick<ProjectFunction, 'displayName' | 'slug'>;
