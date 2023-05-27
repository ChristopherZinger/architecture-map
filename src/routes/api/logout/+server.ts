import { authBearer } from '$lib/server/utils/auth.js';
import { redirect } from '@sveltejs/kit';

export const POST = async ({ cookies }) => {
	cookies.set(authBearer, ' ', {
		maxAge: 0,
		httpOnly: true,
		secure: true,
		path: '/',
		sameSite: true
	});

	throw redirect(300, '/');
};
