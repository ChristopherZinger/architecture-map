<script lang="ts">
	export let height = '16px';
</script>

<div class="spinner" style={`width:${height}; height:${height} `} />

<style>
	@keyframes rotating {
		from {
			-webkit-transform: rotate(0deg);
		}
		to {
			-webkit-transform: rotate(360deg);
		}
	}
	.spinner {
		animation: rotating 2s linear infinite;
		display: inline-block;
		border-radius: 3px;
		background-color: black;
	}
</style>
