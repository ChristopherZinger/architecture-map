<script lang="ts">
	export let height = '32px';
	export let displayedNumber: number;
	export let color: string = '#464646';
	export let textColor: string = '#ffffff';

	function getXOffsetForClusterText(nrOfPoints: number) {
		if (nrOfPoints < 10) {
			return 11;
		} else if (nrOfPoints < 100) {
			return 8;
		} else {
			return 2;
		}
	}
</script>

<svg {height} viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
	<style>
		.t {
			font: 16px sans-serif;
			fill: black;
		}
	</style>

	<circle cx="15.5" cy="15.5" r="15.5" fill={color} />
	<text x={getXOffsetForClusterText(displayedNumber)} y="20" fill={textColor} class="t"
		>{displayedNumber}</text
	>
</svg>

<style>
	.t {
		fill: #d0d0d0;
	}
</style>
