<script lang="ts">
	import Modal from './Modal.svelte';
	import CreateAuthorForm from './CreateAuthorForm.svelte';
	import Button from './Button.svelte';

	export let isOpen: boolean = false;
	export let onClose: () => void;

	let success: boolean | undefined = undefined;
</script>

<Modal {isOpen} title="Create Author" {onClose}>
	<div class="flex flex-col gap-10">
		{#if !success}
			<CreateAuthorForm bind:success />
		{:else}
			<Button type="button" onClick={onClose}>Success!</Button>
		{/if}
	</div>
</Modal>
