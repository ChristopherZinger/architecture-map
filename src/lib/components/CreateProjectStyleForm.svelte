<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from './Button.svelte';
	import TextInput from './inputs/TextInput.svelte';

	export let error: string | undefined = undefined;
	export let success = false;
</script>

<form
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'success') {
				success = true;
			}
			if (result.type === 'error') {
				error = result.error.message;
			}
		};
	}}
	method="POST"
	action="/admin/create-new-project-style?/createProjectStyle"
	class="flex flex-col gap-5"
>
	<TextInput name="displayName" labelText="Display Name:" placeholder="e.g. Brutalism" />

	{#if error}
		<p class="text-red-600 font-bold">{error}</p>
	{/if}

	<div class="flex justify-center mt-5">
		<Button>Submit</Button>
	</div>
</form>
