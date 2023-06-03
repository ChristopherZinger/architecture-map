<script lang="ts">
	import { uniq } from 'lodash';
	import TextInput from './TextInput.svelte';

	export let name: string;
	export let onChange: ((v: string) => void) | undefined;
	export let value: string = '';
	export let labelText: string | undefined = undefined;
	export let placeholder: string = '';
	export let values: string[] = [];
	export let addButtonText: string;
	export let maxNumOfInputValues: number;
	export let required: boolean = false;

	function addValue(v: string) {
		if (v.length && values.length < maxNumOfInputValues) {
			values = uniq([...values, v]);
			value = '';
		}
	}

	function removeValue(v: string) {
		values = values.filter((val) => val !== v);
	}
</script>

<div>
	<div class="flex gap-5 mb-5">
		<div class="w-full">
			<TextInput
				bind:value
				{onChange}
				onEnter={() => {
					addValue(value);
				}}
				{placeholder}
				{labelText}
				{name}
				required={required ? !values.length : false}
			/>
		</div>
		<div class="self-end">
			<button
				type="button"
				on:click={() => {
					addValue(value);
				}}
				class={`
                    block justify-center align-middle
                    bg-black w-40 h-10 rounded-md  text-white
                    font-medium
                `}
			>
				{addButtonText}
			</button>
		</div>
	</div>

	<div class="flex flex-wrap gap-5">
		{#each values as val, i}
			<button
				type="button"
				on:click={() => removeValue(val)}
				class="px-3 rounded-full bg-slate-100"
			>
				{val}
			</button>
			<input type="text" {name} value={val} class="w-auto" hidden />
		{/each}
	</div>
</div>
