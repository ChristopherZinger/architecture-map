import { env } from '$env/dynamic/private';
import type { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';

export const authBearer = 'AuthorizationToken';

export type UserToken = {
	email: string;
	id: string;
	name: string | null;
	iat: number;
	exp: number;
	role: Role;
};

export const signJWT = (user: { email: string; id: string; name: string | null; role: Role }) =>
	jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, env.JWT_KEY, {
		expiresIn: '365 days'
	});
