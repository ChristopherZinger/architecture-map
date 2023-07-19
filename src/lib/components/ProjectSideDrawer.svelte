<script lang="ts">
	import { times } from 'lodash';
	import type { ProjectAPI } from '../../routes/api/projects/fetchProjects';
	import { slide } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { faClose } from '@fortawesome/free-solid-svg-icons';

	export let project: ProjectAPI;
	export let onClose: () => void;

	function getDisplayAuthors(authors: string[]): string {
		if (authors.length === 1) {
			return authors[0];
		}
		return `${authors.slice(0, authors.length - 1).join(', ')} and ${authors[authors.length - 1]}`;
	}
	$: displayAuthros = getDisplayAuthors(project.authors.map((a) => a.fullName));

	function getConstructionDates(project: ProjectAPI): string | null {
		const { constructionYearEnd, constructionYearStart } = project;
		if (constructionYearEnd !== null && constructionYearStart !== null) {
			return `${constructionYearStart}-${constructionYearEnd}`;
		}
		return (constructionYearStart || constructionYearEnd)?.toString() || null;
	}
	$: displayConstructionDate = getConstructionDates(project);
</script>

<div
	transition:slide={{ axis: 'x' }}
	class="absolute flex flex-col gap-5 right-0 top-0 \
		h-full bg-white z-10 p-5 overflow-auto \
		w-full lg:w-1/2"
>
	<div class="h-96 relative">
		<button
			on:click={onClose}
			class="bg-white absolute right-0 w-8 h-8 flex justify-center items-center"
		>
			<Fa icon={faClose} />
		</button>
		<img
			src={project.imgUrls[0].url}
			alt={project.imgUrls[0].content}
			class="w-full h-full object-cover"
			loading="lazy"
		/>
	</div>
	<h1 class="text-2xl">
		<span class="font-bold"> {project.displayName} </span>
		<span> by {displayAuthros} </span>
	</h1>

	{#if project.description}
		<p>
			{project.description}
		</p>
	{/if}

	{#if displayConstructionDate}
		<p>
			<span class="font-semibold">Construction:</span>{displayConstructionDate}
		</p>
	{/if}

	<ul class="flex gap-3 flex-wrap">
		<li><p class="font-semibold">Functions:</p></li>
		{#each project.functions as fn}
			<li>{fn.displayName},</li>
		{/each}
	</ul>

	<ul class="flex gap-3 flex-wrap">
		<li><p class="font-semibold">Styles:</p></li>
		{#each project.styles as style}
			<li>{style.displayName},</li>
		{/each}
	</ul>

	<ul class="flex gap-3 flex-wrap">
		<li><p class="font-semibold">Tags:</p></li>
		{#each project.tags as tag}
			<li>{tag.displayName},</li>
		{/each}
	</ul>

	<div class="flex flex-wrap gap-2">
		{#each project.imgUrls as img}
			<div class="flex-grow h-36">
				<img src={img.url} alt={img.content} class="w-full h-full object-cover" loading="lazy" />
			</div>
		{/each}
	</div>
</div>
