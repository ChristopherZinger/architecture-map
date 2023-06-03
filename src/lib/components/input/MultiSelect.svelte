<script lang="ts">
	import TextInput from '$lib/components/inputs/TextInput.svelte';

	type ValueLabel = {
		value: string;
		label: string;
	};

	export let labelText: string;
	export let options: ValueLabel[];
	export let selectedValues: ValueLabel[];
	export let onTextInputChange: (v: string) => void;
	export let onUnselect: (v: string) => void;
	export let onSelect: (v: string) => void;
</script>

<div class="flex gap-5">
	<div class="grow">
		<TextInput onChange={onTextInputChange} name="searchTextInput-{labelText}" {labelText} />
	</div>
</div>
{#if selectedValues.length}
	<div class="my-5">
		<p class="font-medium">selected:</p>
		{#each selectedValues as { label, value }}
			<ul class="flex flex-wrap gap-5">
				<li class="hover:underline">
					<button
						type="button"
						on:click={() => {
							onUnselect(value);
						}}
					>
						{label}
					</button>
				</li>
			</ul>
		{/each}
	</div>
{/if}
{#if options.length}
	<div class="my-5">
		<p class="font-medium">Options:</p>
		{#each options.filter(({ value }) => !selectedValues
					.map((i) => i.value)
					.includes(value)) as { value, label }}
			<ul>
				<li class="hover:underline">
					<button
						type="button"
						on:click={() => {
							onSelect(value);
						}}>{label}</button
					>
				</li>
			</ul>
		{/each}
	</div>
{/if}
