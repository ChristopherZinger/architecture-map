<script lang="ts">
	import H from './H.svelte';

	export let isOpen: boolean;
	export let title: string;
	export let onClose: () => void;
</script>

{#if isOpen}
	<dialog open={isOpen} class="bg-transparent p-5 w-full md:max-w-2xl">
		<div class="border-2 border-black p-10 bg-white">
			<div class="flex justify-between mb-12">
				<H h="3">{title}</H>
				<button on:click={onClose}>close</button>
			</div>
			<slot />
		</div>
	</dialog>
	<div class="bg" />
{/if}

<style>
	dialog {
		position: fixed;
		top: 50%;
		transform: translateY(-50%);
		z-index: 1001;
	}

	.bg {
		position: fixed;
		width: 400px;
		height: 400px;
		top: 0;
		left: 0;
		z-index: 1000;
		backdrop-filter: blur(1px);
		pointer-events: none;
	}
</style>
