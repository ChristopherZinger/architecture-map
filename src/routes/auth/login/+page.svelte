<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { appUser } from '$lib/stores/appUser';

	$: if ($appUser && browser) {
		goto('/');
	}

	$: if ($page.form?.status === 'success') {
		appUser.setUser($page.form.user);
		goto('/');
	}
</script>

{#if !$appUser}
	<form method="POST" use:enhance>
		<div>
			<label for="email">Email</label>
			<input type="email" name="email" id="email" />
		</div>

		<div>
			<label for="password">Password</label>
			<input type="password" name="password" id="password" />
		</div>

		<button>submit</button>

		{#if $page.form?.error}
			<p>
				{$page.form.error}
			</p>
		{/if}
	</form>
{/if}
