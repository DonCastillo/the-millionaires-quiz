<script lang="ts">
	export let buttonText: string = "Click me";
	let focused: boolean = false;
</script>

<button
	class="button block w-full py-4 px-2 text-2xl font-heading-bold shadow-md bg-primary-1 text-white"
	class:yellow-highlight={focused}
	on:mouseenter={() => (focused = true)}
	on:mouseleave={() => (focused = false)}
	on:mousedown={() => (focused = true)}
	on:mouseup={() => (focused = false)}
	on:click
>
	{buttonText}
</button>
