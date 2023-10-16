<script lang="ts">
	export let style: string = "";
	export let disabled: boolean = false;
	console.log(style);
</script>

<div class="hexagon-container relative flex justify-center items-center mb-5">
	<div class="hexagon-outer w-full">
		<button
			class="hexagon-inner text-2xl leading-7  text-white font-normal-regular px-16 py-5 sm:px-20 sm:py-10 {style}"
			disabled={disabled}
			on:mousedown
			on:mouseup
			on:mouseenter
			on:mouseleave
			on:click
		>
			<slot />
		</button>
	</div>
</div>

<style>
	.hexagon-outer {
		clip-path: polygon(10% 0%, 90% 0, 95% 50%, 90% 100%, 10% 100%, 5% 50%);
		background-color: lightskyblue;
	}
	.hexagon-inner {
		clip-path: polygon(
			10.79% 2.28%,
			89.35% 2.66%,
			93.85% 50%,
			89.36% 97.45%,
			10.65% 97.59%,
			6.15% 50%
		);
		
	}
	.hexagon-container::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		border-bottom: 6px solid white;
		width: 100%;
		height: 50%;
	}
</style>
