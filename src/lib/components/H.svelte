<script lang="ts">
	export let h: '1' | '2' | '3' | '4' | '5' | '6' = '1';
</script>

{#if h === '1'}
	<h1 class="font-bold text-5xl"><slot /></h1>
{:else if h === '2'}
	<h2 class="font-bold text-4xl"><slot /></h2>
{:else if h === '3'}
	<h3 class="font-bold text-3xl"><slot /></h3>
{:else if h === '4'}
	<h4 class="font-bold text-2xl"><slot /></h4>
{:else if h === '5'}
	<h5 class="font-bold text-xl"><slot /></h5>
{:else if h === '6'}
	<h6 class="font-bold text-lg"><slot /></h6>
{/if}
