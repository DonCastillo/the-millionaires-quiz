<script lang="ts">
	import Hexagon from "../container/Hexagon.svelte";

	export let optionLetter: string = "A";
	export let optionText: string = "";
	export let optionSelected: string | null = null;
	export let isSelected: boolean = false;
	export let isAnswer: boolean = false;
	export let disabled: boolean = false;


	const toggleSelection = () => {
		if (optionSelected === optionText) {
			optionSelected = null;
		} else {
			optionSelected = optionText;
		}
	}
</script>



<Hexagon style="min-h-auto w-full flex sm:py-5 {isSelected ? "yellow-highlight" : "black-highlight"} {isAnswer ? "green-highlight blink-1" : ""} " 	
		 on:click={toggleSelection}
		 disabled={disabled}
>
	<div class="w-[35px] mr-2 {isSelected ? "color-primary-2" : "color-selected-2"}">{optionLetter}:</div>
	<div class="flex-1 text-left">{@html optionText}</div>
</Hexagon>
