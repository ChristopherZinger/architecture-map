<script lang="ts">
	export let type: 'button' | 'submit' | null | 'reset' = 'submit';
</script>

<button class="border-2 border-black h-10 hover:text-white hover:bg-black font-bold px-5" {type}
	><slot /></button
>
