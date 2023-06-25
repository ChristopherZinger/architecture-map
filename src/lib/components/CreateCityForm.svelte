<script lang="ts">
	import { enhance } from '$app/forms';
	import slugify from 'slugify';
	import Button from './Button.svelte';
	import SearchDropdown from './inputs/SearchDropdown.svelte';
	import TextInput from './inputs/TextInput.svelte';

	export let error: string | undefined = undefined;
	export let success = false;
	export let countries: { alpha2: string; displayName: string }[];

	$: alpha2 = dropdownValue ? dropdownValue.value : undefined;

	let dropdownValue = countries?.length
		? {
				label: countries[0].displayName,
				value: countries[0].alpha2
		  }
		: undefined;

	let nameInputValue = '';
	$: slug = slugify(nameInputValue, {
		trim: true,
		replacement: '-',
		lower: true
	});
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
	action="/admin/create-new-city?/createCity"
	class="flex flex-col gap-5"
>
	<TextInput name="name" labelText="City Name" placeholder="New York" bind:value={nameInputValue} />
	<TextInput name="slug" labelText="Slug" placeholder="new-york" bind:value={slug} />

	<input type="text" hidden value={alpha2} name="alpha2" />
	<SearchDropdown
		items={countries.map((c) => ({
			label: c.displayName,
			value: c.alpha2
		}))}
		bind:value={dropdownValue}
	/>

	{#if error}
		<p class="text-red-600 font-bold">{error}</p>
	{/if}

	<div class="flex justify-center mt-5">
		<Button>Submit</Button>
	</div>
</form>
