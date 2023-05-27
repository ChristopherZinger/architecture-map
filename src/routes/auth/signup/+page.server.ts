import { prisma } from '$lib/prisma/prisma-client.js';
import z from 'zod';
import bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';

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

		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(parsedData.password, salt);

		const userExists = await prisma.user.findFirst({
			where: {
				email: parsedData.email
			}
		});

		if (userExists) {
			return fail(400, { error: 'User with this email already exists' });
		}

		const user = await prisma.user.create({
			data: {
				email: parsedData.email,
				password: hash,
				role: Role.USER
				// TODO name: / ! generate username
			}
		});

		var token = jwt.sign({ userId: user.id, name: user.name, email: user.email }, env.JWT_KEY, {
			expiresIn: '365 days'
		});

		cookies.set('AuthorizationToken', `Bearer ${token}`, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 365 // 1 year
		});

		return { status: 'success' };
	}
};
