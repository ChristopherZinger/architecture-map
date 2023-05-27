import { prisma } from '$lib/prisma/prisma-client.js';
import z from 'zod';
import bcrypt from 'bcrypt';
import { fail, redirect } from '@sveltejs/kit';
import { authBearer, signJWT } from '$lib/server/utils/auth.js';

export const load = ({ locals }) => {
	if (locals.user) {
		throw redirect(307, '/');
	}
};

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		const parseResult = z
			.object({
				password: z.string().min(6),
				email: z.string().email()
			})
			.safeParse({
				password,
				email
			});

		if (!parseResult.success) {
			return fail(400, { error: 'Bad input!' });
		}

		const parsedData = parseResult.data;

		const user = await prisma.user.findFirst({
			where: {
				email: parsedData.email
			}
		});

		if (!user) {
			return fail(400, { error: "User with this email doesn't exists" });
		}

		const isPasswordCorrect = bcrypt.compareSync(parsedData.password, user.password);

		if (!isPasswordCorrect) {
			return fail(400, { error: 'Incorrect password.' });
		}

		const token = signJWT(user);

		cookies.set(authBearer, `Bearer ${token}`, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 365 // 1 year
		});

		return { status: 'success' };
	}
};
