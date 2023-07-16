<script lang="ts">
	import Button from '../Button.svelte';
	import TextInput from '../inputs/TextInput.svelte';
	import MapLngLatInput from '../map/MapLngLatInput.svelte';
	import { onMount } from 'svelte';
	import { fetchAuthors } from '../../../routes/api/authors/fetchAuthors';
	import LabelInputContainer from './LabelInputContainer.svelte';
	import { fetchProjecFunctions } from '../../../routes/api/projectFunctions/fetchProjectFunctions';
	import { fetchProjecStyles } from '../../../routes/api/projectStyles/fetchProjectStyles';
	import MultiselectDropdownWithSelectedList from './MultiselectDropdownWithSelectedList.svelte';
	import { fetchTags } from '../../../routes/api/tags/fetchTags';
	import CreateCountryModal from '../CreateCountryModal.svelte';
	import CreateCityModal from '../CreateCityModal.svelte';
	import CreateAuthorModal from '../CreateAuthorModal.svelte';
	import CreateProjectFunctionModal from '../CreateProjectFunctionModal.svelte';
	import CreateProjectStyleModal from '../CreateProjectStyleModal.svelte';
	import CreateTagModal from '../CreateTagModal.svelte';
	import { ImgContent } from '@prisma/client';
	import Dropdown, { type DropdownValue } from '../inputs/Dropdown.svelte';
	import { groupBy } from 'lodash';
	import NumberInput from '../inputs/NumberInput.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	type LabelValue = {
		label: string;
		value: string | number;
	};

	$: ((success) => {
		if (success) {
			goto('/admin/create-new-project/success');
		}
	})(success);

	let success: boolean | undefined;
	let error: undefined | string;

	let displayName = '';

	let authorOptions: LabelValue[] = [];
	let selectedAuthorIds: number[] = [];
	let authorSelectValue: LabelValue | undefined = undefined;

	let selectedProjectFunctionSlugs: string[] = [];
	let projectFunctionOptions: LabelValue[] = [];
	let projectFunctionSelectValue: LabelValue | undefined = undefined;

	let selectedProjectStyleSlugs: string[] = [];
	let projectStyleOptions: LabelValue[] = [];
	let projectStyleSelectValue: LabelValue | undefined = undefined;

	let selectedTagSlugs: string[] = [];
	let tagOptions: LabelValue[] = [];
	let tagSelectValue: LabelValue | undefined = undefined;

	let isCountryModalOpen = false;
	let isCityModalOpen = false;
	let isAuthorModalOpen = false;
	let isProjectFunctionModalOpen = false;
	let isProjectStyleModalOpen = false;
	let isTagModalOpen = false;

	let imgTypeInput: { value: ImgContent; label: ImgContent } | undefined;
	let imgUrlInput = '';
	let isImgPrimary = false;
	let imgs: {
		url: string;
		type: ImgContent;
		isPrimary: boolean;
	}[] = [];
	$: imgsStringified = JSON.stringify(imgs);

	function toLabelValue(l: string, v: string | number) {
		return {
			label: l,
			value: v
		};
	}

	onMount(async () => {
		const [_authors, projectFunctions, projectStyles, tags] = await Promise.all([
			await fetchAuthors(),
			await fetchProjecFunctions(),
			await fetchProjecStyles(),
			await fetchTags()
		]);

		authorOptions = _authors.map((el) => toLabelValue(el.fullName, el.id));
		tagOptions = tags.map((el) => toLabelValue(el.displayName, el.slug));
		projectStyleOptions = projectStyles.map((el) => toLabelValue(el.displayName, el.slug));
		projectFunctionOptions = projectFunctions.map((el) => toLabelValue(el.displayName, el.slug));
	});
</script>

<CreateCountryModal
	isOpen={isCountryModalOpen}
	onClose={() => {
		isCountryModalOpen = false;
	}}
/>
<CreateCityModal
	isOpen={isCityModalOpen}
	onClose={() => {
		isCityModalOpen = false;
	}}
/>
<CreateAuthorModal
	isOpen={isAuthorModalOpen}
	onClose={async () => {
		try {
			authorOptions = (await fetchAuthors()).map((el) => toLabelValue(el.fullName, el.id));
		} finally {
			isAuthorModalOpen = false;
		}
	}}
/>

<CreateProjectFunctionModal
	isOpen={isProjectFunctionModalOpen}
	onClose={async () => {
		try {
			projectFunctionOptions = (await fetchProjecFunctions()).map((el) =>
				toLabelValue(el.displayName, el.slug)
			);
		} finally {
			isProjectFunctionModalOpen = false;
		}
	}}
/>

<CreateProjectStyleModal
	isOpen={isProjectStyleModalOpen}
	onClose={async () => {
		try {
			projectStyleOptions = (await fetchProjecStyles()).map((el) =>
				toLabelValue(el.displayName, el.slug)
			);
		} finally {
			isProjectStyleModalOpen = false;
		}
	}}
/>

<CreateTagModal
	isOpen={isTagModalOpen}
	onClose={async () => {
		try {
			tagOptions = (await fetchTags()).map((el) => toLabelValue(el.displayName, el.slug));
		} finally {
			isTagModalOpen = false;
		}
	}}
/>

<form
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'success') {
				success = true;
			}
			if (result.type === 'error') {
				error = result.error.message;
			}
		};
	}}
	class="flex flex-col gap-10"
	method="POST"
	action="/admin/create-new-project?/createProject"
>
	{#if error}
		<div class="font-bold text-red-500">{error}</div>
	{/if}

	<MapLngLatInput />

	<LabelInputContainer>
		<label slot="label" for="displayName">Display Name:</label>
		<TextInput
			slot="input"
			name="displayName"
			bind:value={displayName}
			placeholder="e.g Villa Savoye"
			required
		/>
	</LabelInputContainer>

	<MultiselectDropdownWithSelectedList
		onModalOpen={() => {
			isAuthorModalOpen = true;
		}}
		bind:value={authorSelectValue}
		name="authors"
		label="Authors:"
		placeholder="e.g Mies Van Der Roche"
		onSelect={(value) => {
			if (typeof value === 'number' && !selectedAuthorIds.includes(value)) {
				selectedAuthorIds = [...selectedAuthorIds, value];
			}
			authorSelectValue = undefined;
		}}
		onUnselect={(value) => {
			selectedAuthorIds = selectedAuthorIds.filter((id) => id !== value);
		}}
		options={authorOptions}
		selectedValues={selectedAuthorIds}
	/>

	<LabelInputContainer>
		<label slot="label" for="constructionStart">Construction Start (year):</label>
		<NumberInput
			name="constructionStart"
			slot="input"
			min={0}
			max={new Date().getFullYear()}
			placeholder="1990"
		/>
	</LabelInputContainer>

	<LabelInputContainer>
		<label slot="label" for="constructionEnd">Construction End (year):</label>
		<NumberInput
			name="constructionEnd"
			slot="input"
			min={0}
			max={new Date().getFullYear()}
			placeholder="1992"
		/>
	</LabelInputContainer>

	<MultiselectDropdownWithSelectedList
		bind:value={projectFunctionSelectValue}
		name="project-function"
		label="Functions:"
		placeholder="e.g School"
		onModalOpen={() => {
			isProjectFunctionModalOpen = true;
		}}
		onSelect={(value) => {
			if (typeof value === 'string' && !selectedProjectFunctionSlugs.includes(value)) {
				selectedProjectFunctionSlugs = [...selectedProjectFunctionSlugs, value];
			}
			projectFunctionSelectValue = undefined;
		}}
		onUnselect={(value) => {
			selectedProjectFunctionSlugs = selectedProjectFunctionSlugs.filter((slug) => slug !== value);
		}}
		options={projectFunctionOptions}
		selectedValues={selectedProjectFunctionSlugs}
	/>

	<MultiselectDropdownWithSelectedList
		bind:value={projectStyleSelectValue}
		name="project-style"
		label="Styles"
		placeholder="e.g Brutalism"
		onModalOpen={() => {
			isProjectStyleModalOpen = true;
		}}
		onSelect={(value) => {
			if (typeof value === 'string' && !selectedProjectStyleSlugs.includes(value)) {
				selectedProjectStyleSlugs = [...selectedProjectStyleSlugs, value];
			}
			projectStyleSelectValue = undefined;
		}}
		onUnselect={(value) => {
			selectedProjectStyleSlugs = selectedProjectStyleSlugs.filter((slug) => slug !== value);
		}}
		options={projectStyleOptions}
		selectedValues={selectedProjectStyleSlugs}
	/>

	<MultiselectDropdownWithSelectedList
		bind:value={tagSelectValue}
		name="tag"
		label="Tags:"
		placeholder="e.g steel construction"
		onModalOpen={() => {
			isTagModalOpen = true;
		}}
		onSelect={(value) => {
			if (typeof value === 'string' && !selectedTagSlugs.includes(value)) {
				selectedTagSlugs = [...selectedTagSlugs, value];
			}
			tagSelectValue = undefined;
		}}
		onUnselect={(value) => {
			selectedTagSlugs = selectedTagSlugs.filter((slug) => slug !== value);
		}}
		options={tagOptions}
		selectedValues={selectedTagSlugs}
	/>

	<form
		id="img-form"
		class="flex flex-col gap-10"
		on:submit|preventDefault={() => {
			if (!imgTypeInput) {
				console.error('missing img type');
				return;
			}

			const data = {
				url: imgUrlInput,
				type: imgTypeInput?.value,
				isPrimary: isImgPrimary
			};
			imgs = [...imgs, data];
		}}
	>
		<h2 class="font-semibold">Image</h2>
		<LabelInputContainer>
			<label slot="label" for="url-input">Url:</label>
			<TextInput
				bind:value={imgUrlInput}
				slot="input"
				name="url-input"
				placeholder="https:// ..."
				required
			/>
		</LabelInputContainer>

		<LabelInputContainer>
			<label for="img-type">Type</label>
			<Dropdown
				name="img-type"
				slot="input"
				bind:value={imgTypeInput}
				items={Object.entries(ImgContent).map((i) => ({
					label: i[0],
					value: i[1]
				}))}
				placeholder="Select Image Type"
				required
			/>
		</LabelInputContainer>

		<LabelInputContainer>
			<label slot="label" for="isPrimary">Is Primary</label>
			<input slot="input" bind:checked={isImgPrimary} type="checkbox" name="isPrimary" />
		</LabelInputContainer>

		<div>
			<Button type="submit" form="img-form">Add Image</Button>
		</div>
	</form>

	<div class="flex gap-y-10 flex-wrap">
		{#each Object.entries(groupBy(imgs, (i) => i.type)) as [_, _imgs]}
			{#each _imgs as img}
				<div class="w-1/5 flex flex-col box-border gap-4 p-1 rounded">
					<button
						class="p-3 rounded"
						class:bg-slate-200={img.isPrimary}
						type="button"
						on:click={() => {
							imgs = imgs.filter((i) => i !== img);
						}}
					>
						<img src={img.url} alt="img" />
						<div>{img.type}</div>
					</button>
				</div>
			{/each}
		{/each}
	</div>

	<input type="text" name="imgs-json" bind:value={imgsStringified} hidden />

	<div class="flex justify-center">
		<Button type="submit">Create Project</Button>
	</div>
</form>
