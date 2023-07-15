<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { fetchCities, type CityAPI } from '../../routes/api/cities/fetchCities';
	import TextInput from './inputs/TextInput.svelte';
	import type { DropdownValue } from './inputs/Dropdown.svelte';
	import Dropdown from './inputs/Dropdown.svelte';
	import Fa from 'svelte-fa';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Button from './Button.svelte';
	import { uniq } from 'lodash';
	import CreateCityModal from './CreateCityModal.svelte';

	export let success: boolean | undefined = undefined; // bind value

	let error: undefined | string = undefined;

	let akas: string[] = [];
	let akaInputValue = '';

	let cities: CityAPI[] = [];
	onMount(() => {
		fetchCities().then((r) => {
			cities = r;
		});
	});
	$: cityOptions = cities.map((c) => ({
		label: c.displayName,
		value: c.id,
		group: c.country.displayName
	}));
	$: selectedCityId = selectedCity?.value;
	let selectedCity: { label: string; value: DropdownValue } | undefined = undefined;

	let isCityModalOpen = false;
</script>

<form
	id="create-author"
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
	action="/admin/create-new-author?/createAuthor"
	class="flex flex-col gap-10"
>
	<div class="flex flex-col gap-5">
		<label for="fullName">Full Name:</label>
		<TextInput name="fullName" required placeholder="e.g. Mies Van Der Roche" />
	</div>

	<div class="flex justify-between">
		<label for="birthDate">Birth Date:</label>
		<input type="date" name="birthDate" required />
	</div>

	<div class="flex justify-between">
		<label for="deathDate">Death Date:</label>
		<input type="date" name="deatchDate" />
	</div>

	<div class="flex flex-col gap-5">
		<label for="info">Info:</label>
		<textarea name="info" class="bg-gray-100 rounded p-5" placeholder="Info.." />
	</div>
	<form on:submit|preventDefault={() => {}}>
		<label for="akas">Also Known As (AKA):</label>
		<TextInput
			name="akas-input"
			placeholder="e.g. Le Corbusieur"
			bind:value={akaInputValue}
			onEnter={(v) => {
				akas = uniq([...akas, v]);
				akaInputValue = '';
			}}
		/>
	</form>
	<div class="flex gap-5">
		{#each akas as item}
			<div>
				<button
					type="button"
					on:click={() => {
						akas = akas.filter((el) => el !== item);
					}}>{item}</button
				>
				<input type="text" name="akas" value={item} hidden />
			</div>
		{/each}
	</div>
	<div />

	<div>
		<label for="city">City: </label>
		<div class="flex justify-items-center gap-5">
			<div class="grow">
				<Dropdown
					items={cityOptions}
					required
					name="city-dropdown"
					bind:value={selectedCity}
					searchable={true}
					placeholder="e.g Berlin"
				/>
				<input name="cityId" type="number" bind:value={selectedCityId} hidden />
			</div>

			<button
				type="button"
				on:click={() => {
					isCityModalOpen = true;
				}}
			>
				<Fa icon={faPlus} />
			</button>
		</div>
	</div>

	{#if error}
		<span class="font-bold text-red-500">
			{error}
		</span>
	{/if}

	<Button form="create-author" type="submit">Submit</Button>
</form>

<CreateCityModal
	isOpen={isCityModalOpen}
	onClose={() => {
		fetchCities().then((r) => {
			cities = r;
		});
		isCityModalOpen = false;
	}}
/>
