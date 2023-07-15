<script lang="ts">
	import Fa from 'svelte-fa';
	import type { DropdownValue } from '../inputs/Dropdown.svelte';
	import SearchDropdown from '../inputs/SearchDropdown.svelte';
	import LabelInputContainer from './LabelInputContainer.svelte';
	import MultiselectTagList from './MultiselectTagList.svelte';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';

	export let value: { label: string; value: DropdownValue } | undefined;
	export let options: { value: string | number; label: string }[];
	export let selectedValues: (string | number)[];
	export let onSelect: (value: DropdownValue) => void;
	export let onUnselect: (value: DropdownValue) => void;
	export let name: string;
	export let label: string;
	export let onModalOpen: () => void;
</script>

<LabelInputContainer>
	<label slot="label" for={name}>{label}</label>
	<div slot="input" class="flex gap-5 col-span-3">
		<div class="grow">
			<SearchDropdown
				bind:value
				onSelect={(item) => onSelect(item.value)}
				items={options}
				name={`${name}-dropdown`}
			/>
		</div>
		<button type="button" on:click={onModalOpen}>
			<Fa icon={faPlus} />
		</button>
	</div>

	<MultiselectTagList
		onClick={(value) => onUnselect(value)}
		selectedItems={options.filter(({ value }) => selectedValues.includes(value))}
	/>
</LabelInputContainer>
