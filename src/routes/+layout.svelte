<script>
	import "./styles.css";
</script>

<div class="app">
	<header class="p-3">
		<h1>The Millionnaire's Quiz</h1>
        <!-- <i class="fa-ancient-greece"></i> -->
	</header>
	<main id="main-wrapper">
		<slot />
	</main>
	<footer class="p-4">
		<p class="text-center">Developed by Don Castillo</p>
	</footer>
</div>

<style>
	.app {
		background-color: orange;
		margin: 0;
		padding: 0;
		min-height: inherit;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	#main-wrapper {
		flex-grow: 1;
	}
	header {
		background-color: green;
	}
	main {
		background-color: pink;
	}
	footer {
		background-color: blue;
	}
</style>
