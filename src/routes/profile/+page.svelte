<script lang="ts">
	import { appUser } from '$lib/stores/appUser';
</script>

<h1>User Profile</h1>
{#if $appUser}
	<ul>
		{#if $appUser.name} <li>user: ${$appUser.name}</li>{/if}
		<li>email: {$appUser.email}</li>
		<li>role: {$appUser.role}</li>
	</ul>
{/if}
