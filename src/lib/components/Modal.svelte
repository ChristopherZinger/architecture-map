<script lang="ts">
	export let isOpen: boolean;
</script>

<dialog open={isOpen} class="bg-transparent p-5 w-full md:max-w-2xl">
	<div class="border-2 border-black p-10 bg-white">
		<slot />
	</div>
</dialog>
{#if isOpen}
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
