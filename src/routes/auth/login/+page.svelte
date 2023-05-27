<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	$: if ($page.form?.status === 'success') {
		goto('/profile');
	}
</script>

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
