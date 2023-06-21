// See https://kit.svelte.dev/docs/types#app

import type { UserToken } from '$lib/server/utils/auth';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: UserToken | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

declare module '@fortawesome/pro-solid-svg-icons/index.es' {
	export * from '@fortawesome/pro-solid-svg-icons';
}

export {};
