<script>
	import { appUser } from '$lib/stores/appUser';
	import Fa from 'svelte-fa';
	import {
		faUser,
		// faSliders,
		// faMagnifyingGlass,
		faArrowRightFromBracket
	} from '@fortawesome/free-solid-svg-icons';

	async function logout() {
		await fetch('/api/logout', {
			method: 'POST'
		});
		appUser.setUser(null);
	}
</script>

<div class="h-20 flex items-center mx-10">
	<div class="flex justify-between grow">
		<ul class="flex gap-5">
			<li><a href="/" class="font-bold">Modernism Map</a></li>
		</ul>
		<ul class="flex items-center gap-5">
			<!-- <li class="w-4 h-4 flex items-center"><Fa icon={faMagnifyingGlass} /></li>
			<li class="w-4 h-4 flex items-center"><Fa icon={faSliders} /></li> -->
			{#if $appUser}
				<li class="w-4 h-4 flex items-center"><a href="/profile"> <Fa icon={faUser} /> </a></li>
				<li class="w-4 h-4 flex items-center">
					<button type="button" on:click={logout}>
						<Fa icon={faArrowRightFromBracket} />
					</button>
				</li>
			{:else}
				<li class="w-4 h-4 flex items-center"><a href="/auth/signup"> <Fa icon={faUser} /> </a></li>
				<!-- <li><a href="/auth/login">login</a></li> -->
			{/if}
		</ul>
	</div>
</div>
