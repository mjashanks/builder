<script>
	
	import NoPackage from "./NoPackage.svelte";
	import PackageRoot from "./PackageRoot.svelte";
	import {packageInfo, initialise} from "./builderStore";
	
</script>

<main>

	{#await initialise()}
	
		<h1>loading</h1>

	{:then result}
		{#if $packageInfo.hasAppPackage}
		<PackageRoot />
		{/if}

		{#if !$packageInfo.hasAppPackage}
		<NoPackage />
		{/if}

	{:catch err}
		<h1 style="color:red">{err}</h1>
	{/await}
</main>

<style>
	main {
		height: 100%;
		width: 100%;
		font-family: "Nunito", Helvetica, Arial, sans-serif;
	}
</style>