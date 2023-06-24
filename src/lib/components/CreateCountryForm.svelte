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
	action="/admin/create-new-country?/createCountry"
	class="flex flex-col gap-5"
>
	<TextInput name="name" labelText="Country Name" placeholder="Italy" />
	<TextInput name="alpha2" labelText="Alpha 2" maxLength={2} placeholder="IT" />

	{#if error}
		<p class="text-red-600 font-bold">{error}</p>
	{/if}

	<div class="flex justify-center mt-5">
		<Button>Submit</Button>
	</div>
</form>
