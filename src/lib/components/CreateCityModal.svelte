<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchCountries, type Country } from '../../routes/api/country/fetchCities';
	import Button from './Button.svelte';
	import CreateCityForm from './CreateCityForm.svelte';
	import Modal from './Modal.svelte';

	export let isOpen: boolean;
	export let onClose: () => void;

	function _onClose() {
		error = undefined;
		success = false;
		onClose();
	}

	let success: boolean = false;
	let error: string | undefined;

	let isMounted = false;
	onMount(() => {
		isMounted = true;
	});

	let countries: undefined | Country[];

	$: if (isMounted && isOpen) {
		fetchCountries().then((r) => {
			countries = r;
		});
	}
</script>

<Modal {isOpen} title="Create City" onClose={_onClose}>
	<div class="flex flex-col gap-10">
		<div>
			{#if countries}
				{#if !success}
					<CreateCityForm bind:success bind:error {countries} />
				{:else}
					<div class="flex flex-col gap-5 items-center">
						<Button onClick={_onClose} type="button">Success!</Button>
					</div>
				{/if}
			{:else}
				loading
			{/if}
		</div>
	</div>
</Modal>
