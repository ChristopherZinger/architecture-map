<script lang="ts">
	import { appUser } from '$lib/stores/appUser.js';

	export let data;

	appUser.setUser(data.user);
</script>

{#if $appUser !== undefined}
	<slot />
{:else}
	<p>loading...</p>
{/if}
