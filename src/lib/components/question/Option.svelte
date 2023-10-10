<script lang="ts">
	export let optionLetter: string = "A";
	export let optionText: string = "";
	export let isOptionCorrect: boolean = false;
	let optionActive: boolean = false;
    export let optionSelected: string | null = null;
</script>

<div class="option-container relative flex justify-center items-center mb-3">
	<div class="option-outer w-full">
        <button
            on:mouseenter={() => (optionActive = true)}
            on:mouseleave={() => (optionActive = false)}
            on:click={() => (optionSelected = optionText)}
            class="option-label text-2xl flex flex-row items-start w-full leading-7 text-white font-normal-regular bg-primary-2 px-14 py-3 sm:px-20 sm:py-5 cursor-pointer {optionActive && 'selected-item'}"
        >
            <div class="w-[35px] mr-2 color-selected-2">{optionLetter}:</div>
            <div class="flex-1 text-left">{optionText}</div>
        </button>
	</div>
</div>

<style>
	.option-outer {
		clip-path: polygon(10% 0%, 90% 0, 95% 50%, 90% 100%, 10% 100%, 5% 50%);
		background-color: white;
	}
	.option-label {
		clip-path: polygon(
			10.79% 2.28%,
			89.35% 2.66%,
			93.85% 50%,
			89.36% 97.45%,
			10.65% 97.59%,
			6.15% 50%
		);
	}
	.option-container::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		border-bottom: 4px solid white;
		width: 100%;
		height: 50%;
	}
</style>
