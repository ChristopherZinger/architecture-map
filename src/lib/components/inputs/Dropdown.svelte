<script context="module" lang="ts">
	export type DropdownValue = null | string | number;
</script>

<script lang="ts">
	import Select from 'svelte-select';
	import Fa from 'svelte-fa';
	import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

	export let items: { label: string; value: DropdownValue }[];
	export let value: { label: string; value: DropdownValue } | undefined;
	export let placeholder = 'Please select';
	export let searchable = false;
	export let name = 'select';
	export let onSelect: ((item: { label: string; value: DropdownValue }) => void) | undefined =
		undefined;
	export let required = false;
</script>

<div class="border-b-2 border-b-black pb-2">
	<Select
		{required}
		{items}
		bind:value
		{placeholder}
		{name}
		{searchable}
		groupBy={(i) => i.group}
		on:change={({ detail }) => {
			if (detail.value !== value && onSelect) {
				onSelect(detail);
			}
		}}
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
