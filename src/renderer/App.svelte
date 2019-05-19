<script>
	
	import NoPackage from "./NoPackage.svelte";
	import PackageRoot from "./PackageRoot.svelte";
	import {hasAppPackage, initialise} from "./builderStore";
	
</script>

<main>

	{#await initialise()}
	
		<h1>loading</h1>

	{:then result}
		{#if $hasAppPackage}
		<PackageRoot />
		{/if}

		{#if !$hasAppPackage}
		<NoPackage />
		{/if}
	
	{/await}
</main>

<style>
	main {
		height: 100%;
		width: 100%;
		font-family: "Nunito", Helvetica, Arial, sans-serif;
	}
</style>