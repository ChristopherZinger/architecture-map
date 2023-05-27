<script lang="ts">
	import { appUser } from '$lib/stores/appUser.js';

	export let data;
	appUser.setUser(data.user);

	async function logout() {
		await fetch('/api/logout', {
			method: 'POST'
		});
		appUser.setUser(null);
	}
</script>

{#if $appUser !== undefined}
	<ul>
		<li><a href="/">home</a></li>
		{#if $appUser}
			<li><a href="/profile">profile</a></li>
			<li>
				<button type="button" on:click={logout}>logout</button>
			</li>
		{:else}
			<li><a href="/auth/signup">signup</a></li>
			<li><a href="/auth/login">login</a></li>
		{/if}
	</ul>
	<slot />
{:else}
	<p>loading...</p>
{/if}
