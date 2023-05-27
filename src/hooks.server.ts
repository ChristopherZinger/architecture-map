import { JWT_KEY } from '$env/static/private';
import { authBearer } from '$lib/server/utils/auth';
import { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

export async function handle({ event, resolve }) {
	const { cookies } = event;
	const userToken = cookies.get(authBearer)?.split(' ')[1];

	const decodedUser = userToken && jwt.verify(userToken, JWT_KEY);

	const parseResult =
		decodedUser &&
		z
			.object({
				id: z.string().min(1),
				name: z.string().nullable(),
				email: z.string().email(),
				iat: z.number(),
				exp: z.number(),
				role: z.nativeEnum(Role)
			})
			.safeParse(decodedUser);

	if (parseResult && parseResult.success) {
		const user = parseResult.data;
		event.locals.user = user;
	} else {
		event.locals.user = null;
	}

	const response = await resolve(event);
	return response;
}
