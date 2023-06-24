<script lang="ts">
	import Button from './Button.svelte';
	import Modal from './Modal.svelte';
	import CreateCountryForm from './CreateCountryForm.svelte';

	export let isOpen: boolean;
	export let onClose: () => void;

	function _onClose() {
		error = undefined;
		success = false;
		onClose();
	}

	let success: boolean = false;
	let error: string | undefined;
</script>

<Modal {isOpen} title="Create Country" onClose={_onClose}>
	<div class="flex flex-col gap-10">
		<div>
			{#if !success}
				<CreateCountryForm bind:success bind:error />
			{:else}
				<div class="flex flex-col gap-5 items-center">
					<Button onClick={_onClose} type="button">Success!</Button>
				</div>
			{/if}
		</div>
	</div>
</Modal>
