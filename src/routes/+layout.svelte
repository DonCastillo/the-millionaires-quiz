<script lang="ts">
	import "./styles.css";
	import { page } from "$app/stores";
	import { user_name } from "$lib/store/main";
	console.log("page", $page);
</script>

<div class="app">
	<header class="p-3 py-5 text-white">
		<h1 class="text-2xl">The Millionnaire's Quiz</h1>
	</header>
	{#if !$user_name}
		<nav class="text-white py-3 text-xl font-heading-regular">
			<ul class="flex flex-row flex-nowrap justify-center items-center gap-12">
				<li><a href="/" aria-current={$page.url.pathname === '/'}>Home</a></li>
				<li><a href="/scoreboard" aria-current={$page.url.pathname === '/scoreboard'}>Scoreboard</a></li>
				<li><a href="/about" aria-current={$page.url.pathname === '/about'}>About</a></li>
			</ul>
		</nav>
	{/if}
	<main id="main-wrapper" class="flex flex-col justify-center items-center">
		<slot />
	</main>
	<footer class="p-4">
		<p class="text-center text-white font-heading-regular">Developed by Don Castillo</p>
	</footer>
</div>

<style>
	.app {
		margin: 0;
		padding: 0;
		min-height: inherit;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	#main-wrapper {
		flex: 1;
	}
</style>
