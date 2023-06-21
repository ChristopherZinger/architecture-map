<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import AuthBox from '$lib/components/auth/AuthBox.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
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
	<div class="container xl">
		<AuthBox>
			<h1 class="text-xl font-bold text-center md:text-left">Signup</h1>
			<form method="POST" use:enhance class="flex flex-col gap-14">
				<TextInput name="email" labelText="Email:" placeholder="tom@hotmail.com" />

				<TextInput name="password" labelText="Password:" type="password" placeholder="******" />

				<div class="mx-auto w-52 flex flex-col">
					<Button type="submit">Signup</Button>
				</div>

				{#if $page.form?.error}
					<p>
						{$page.form.error}
					</p>
				{/if}
			</form>
			<p class="text-sm text-center">
				<a class="font-semibold hover:underline" href="/auth/login">Login</a> if you already have an
				account.
			</p>
		</AuthBox>
	</div>
{/if}
