<script lang="ts">
	import { appUser } from '$lib/stores/appUser';
</script>

<div class="container">
	<div class="mt-16 flex flex-col gap-5">
		<h1 class="text-xl font-bold">User Profile</h1>
		{#if $appUser}
			<ul>
				{#if $appUser.name} <li>user: ${$appUser.name}</li>{/if}
				<li>Email: <b>{$appUser.email}</b></li>
			</ul>
		{/if}
	</div>
</div>
