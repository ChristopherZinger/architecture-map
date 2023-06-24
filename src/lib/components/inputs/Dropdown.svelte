<script lang="ts">
	import Select from 'svelte-select';
	import Fa from 'svelte-fa';
	import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

	export let items: { label: string; value: string }[];
	export let value: string;
	export let placeholder = 'Please select';
	export let searchable = false;
	export let name = 'select';
</script>

<div class="border-b-2 border-b-black pb-2">
	<Select
		{items}
		bind:value
		{placeholder}
		{name}
		{searchable}
		--border="none"
		--border-focused="none"
		--border-hover="none"
		--padding="0.5rem"
		--value-container-padding="0"
	>
		<div class:hidden={!searchable} slot="prepend" style="margin-right: 10px;">
			<Fa icon={faMagnifyingGlass} />
		</div>
	</Select>
</div>

<style>
	.hidden {
		display: none;
	}
</style>
