<script lang="ts">
	export let name: string;
	export let onChange: ((v: string) => void) | undefined = undefined;
	export let value: string = '';
	export let labelText: string | undefined = undefined;
	export let placeholder: string = '';
	export let required: boolean = false;
	export let onEnter: (() => void) | undefined = undefined;
	export let disabled: boolean = false;
</script>

<div>
	<div>
		{#if $$slots.label}
			<slot name="label" />
		{:else if labelText}
			<label for={name}>{labelText}</label>
		{/if}
	</div>
	<input
		type="text"
		{name}
		bind:value
		on:keyup={(e) => {
			if (onEnter && e.key === 'Enter') {
				onEnter();
			}
		}}
		on:input={({ currentTarget: { value } }) => onChange && onChange(value)}
		{placeholder}
		{required}
		{disabled}
		class={`
            focus:outline-none
            p-3 w-full 
            border-b-black border-b-2
        `}
	/>
</div>
