import type { Role } from '@prisma/client';
import { writable } from 'svelte/store';

export type AppUser = {
	name: string | null;
	email: string;
	id: string;
	role: Role;
};

export const appUser = (function () {
	const { subscribe, set } = writable<null | undefined | AppUser>(undefined);

	return {
		subscribe,
		setUser: (user: AppUser | null) => set(user)
	};
})();
