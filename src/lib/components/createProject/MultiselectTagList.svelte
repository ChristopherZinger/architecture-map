<script lang="ts">
	export let selectedItems: { label: string; value: string | number }[];
	export let onClick: (item: string | number) => void;
	export let name: string;
</script>

{#if selectedItems.length > 0}
	<div class="col-start-2 col-span-3 flex flex-wrap gap-5 my-5">
		{#each selectedItems as item}
			<button
				type="button"
				on:click={() => {
					onClick(item.value);
				}}>{item.label}</button
			>
			<input type="text" value={item.value} {name} hidden />
		{/each}
	</div>
{/if}
