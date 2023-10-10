<script lang="ts">
	import Option from "./Option.svelte";
    import {createEventDispatcher} from "svelte";
    const dispatch = createEventDispatcher();
    

	export let question: string = "";
	export let options: any[] = [];
    let optionSelected: string | null = null;
    $: correctAnswer = options.find((option) => option.isCorrect).label;
    $: correctAnswer === optionSelected ? dispatch("correct") : dispatch("incorrect");
    $: console.log("correctAnswer:", correctAnswer);
    $: console.log("optionSelecitoed:", optionSelected);
    const letters = ["A", "B", "C", "D"];
</script>

<div class="question-container relative flex justify-center items-center mb-5 bg-pink-500">
    <div class="question-outer">
        <h2
            id="question-label"
            class="text-2xl leading-7 text-white font-normal-regular bg-primary-2 px-16 py-5 sm:px-20 sm:py-10"
        >
            {question}
        </h2>
    </div>
</div>
<div>
    { #each options as option, index }
        <Option optionLetter={letters[index]} optionText={option.label} isOptionCorrect={option.isCorrect} bind:optionSelected={optionSelected}/>
    { /each }
</div>



<style>
	.question-outer {
		clip-path: polygon(10% 0%, 90% 0, 95% 50%, 90% 100%, 10% 100%, 5% 50%);
		background-color: white;
	}
	#question-label {
		clip-path: polygon(10.79% 2.28%, 89.35% 2.66%, 93.85% 50%, 89.36% 97.45%, 10.65% 97.59%, 6.15% 50%);
	}
    .question-container::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        border-bottom: 6px solid white;
        width: 100%;
        height:50%;
    }
</style>
