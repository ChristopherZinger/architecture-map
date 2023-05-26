import { prisma } from '$lib/prisma/prisma-client';
import { Role } from '@prisma/client';

export const load = async () => {
	const user = await prisma.user.findFirst();
	if (user) {
		return {
			user
		};
	}

	const newUser = await prisma.user.create({
		data: {
			email: 'hi@bb.com',
			role: Role.USER
		}
	});

	return { user: newUser };
};
