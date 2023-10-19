<script lang="ts">
	export let buttonText: string = "Click me";
	export let style: string = "";
	let focused: boolean = false;
</script>

<button
	class="button block w-full py-4 px-2 text-2xl font-heading-bold shadow-md bg-primary-1 text-white mb-5 {style}"
	class:yellow-highlight={focused}
	on:mouseenter={() => (focused = true)}
	on:mouseleave={() => (focused = false)}
	on:mousedown={() => (focused = true)}
	on:mouseup={() => (focused = false)}
	on:click
>
	{@html buttonText}
</button>
