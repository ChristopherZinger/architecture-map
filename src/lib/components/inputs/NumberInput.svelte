<script lang="ts">
	export let name: string;
	export let min: number | undefined = undefined;
	export let max: number | undefined = undefined;
	export let step: number = 1;
	export let placeholder: string | undefined = undefined;
</script>

<input
	type="number"
	{placeholder}
	{step}
	{name}
	{min}
	{max}
	class="border-b-2 border-b-black w-full p-4"
/>
