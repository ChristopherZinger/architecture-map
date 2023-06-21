<script lang="ts">
	import '../app.css';
	import { appUser } from '$lib/stores/appUser.js';
	import TopNav from '$lib/components/navs/TopNav.svelte';

	export let data;
	appUser.setUser(data.user);
</script>

{#if $appUser !== undefined}
	<div class="flex flex-col" style="min-height: 100vh">
		<TopNav />
		<div class="flex flex-grow">
			<slot />
		</div>
	</div>
{:else}
	<p>loading...</p>
{/if}
