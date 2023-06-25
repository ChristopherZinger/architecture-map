<script lang="ts">
	import Dropdown from './Dropdown.svelte';

	export let items: { label: string; value: string }[];
	export let value: { label: string; value: string } | undefined;
	export let placeholder = 'Please select';
	export let name = 'select';
</script>

<Dropdown bind:value searchable={true} {placeholder} {name} {items} />
