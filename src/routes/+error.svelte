<script>
	import { page } from '$app/stores';
</script>

<div class="container">
	<div class="flex flex-col justify-center items-center">
		{#if $page.error}
			<h1 class="text-6xl">{$page.status}</h1>
			<p>{$page.error.message}</p>
		{/if}
	</div>
</div>
