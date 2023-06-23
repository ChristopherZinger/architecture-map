<script lang="ts">
	export let type: 'button' | 'submit' | null | 'reset' = 'submit';
	export let onClick: (() => void) | undefined;

	function _handler() {
		if (onClick) {
			onClick();
		}
	}
</script>

<button
	on:click={_handler}
	class="border-2 border-black h-10 hover:text-white hover:bg-black font-bold px-5"
	{type}><slot /></button
>
