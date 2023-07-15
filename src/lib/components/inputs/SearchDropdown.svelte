<script lang="ts">
	import Dropdown, { type DropdownValue } from './Dropdown.svelte';

	export let items: { label: string; value: DropdownValue }[];
	export let value: { label: string; value: DropdownValue } | undefined;
	export let placeholder = 'Please select';
	export let name = 'select';
	export let onSelect: ((item: { label: string; value: DropdownValue }) => void) | undefined =
		undefined;
</script>

<Dropdown bind:value searchable={true} {placeholder} {name} {items} {onSelect} />
