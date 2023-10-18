<script lang="ts">
	import { formatCurrency } from '$lib/utils/utils';
	import { user_name, won_jackpot } from './../../store/main.ts';
	import { user_cash_prize } from '$lib/store/main';
	import { money_prices } from '$lib/store/main';
	import type QuestionInterface from "$lib/interfaces/question.interface";
	import Button from "../container/Button.svelte";
	import Hexagon from "../container/Hexagon.svelte";
	import Option from "./Option.svelte";
	import { createEventDispatcher, onMount } from "svelte";
	const dispatch = createEventDispatcher();
	const letters = ["A", "B", "C", "D"];

	export let questions: QuestionInterface[] = [];
	let questionIndex: number = 0;
	let optionSelected: string | null = null;
    let revealAnswer: boolean = false;
    let message: string = "";
    let showProceedButton: boolean = false;
    let disabledOptions: string[] = [];
    let gameOver: boolean = false;

	$: currentQuestion = questions[questionIndex % questions.length];
    $: console.log("option selected----: ", optionSelected )
    $: console.log("choices: ", currentQuestion.choices)
	$: correctAnswer = currentQuestion.choices.find((choice) => choice.isCorrect)?.label;

    onMount(() => {
        resetParameters();
    })


    const finalizeAnswer = () => {
        console.log("option selected: ", optionSelected)
        console.log("correct Ansert: ", correctAnswer)
        showProceedButton = false;
        message = "";
        if(optionSelected === correctAnswer) {
            // go to next question
            // console.log($money_prices) 
            dispatch("correct", { questionIndex })
            message = "You are correct!";
            showProceedButton = true;
            optionSelected = null;
        } else {
            dispatch("incorrect")
            message = "You are incorrect! The correct answer is: " + correctAnswer;
        }
        revealAnswer = true;
        disabledAllOptions();
    }

    const nextQuestion = () => {
        questionIndex++;
        revealAnswer = false;
        disabledOptions = [];
        optionSelected = null;
        showProceedButton = false;
        message = "";
    }

    const claimPrize = () => {
        dispatch("claimprize");
    }

    const disabledAllOptions = () => {
        disabledOptions = currentQuestion.choices.map((choice) => choice.label);
    }

    const disabledAnOption = (option: []) => {
        disabledOptions = option;
    }

    const resetParameters = () => {
        questionIndex = 0;
        optionSelected = null;
        revealAnswer = false;
        message = "";
        showProceedButton = false;
        disabledOptions = [];
        gameOver = false;
    }
</script>

<h2 class="text-center text-2xl font-heading-bold text-white mb-3">Contestant:<br>{$user_name}</h2>
<h3>
	<Hexagon style="w-full min-h-[150px] black-highlight cursor-default">
        {@html currentQuestion?.question}
    </Hexagon>
</h3>

<div>
	{#each currentQuestion.choices as option, index}
		<Option
			optionLetter={letters[index]}
			optionText={option.label}
            isSelected={optionSelected === option.label}
            isAnswer={revealAnswer && (correctAnswer === option.label)}
            disabled={disabledOptions.includes(option.label)}
			bind:optionSelected
		/>
	{/each}
</div>

{#if message}
    <div>
        <h3 class="text-white text-center text-2xl font-heading-regular">{message}</h3>
    </div>
{/if}

<div class="mt-10 px-10 flex flex-col sm:flex-row gap-3">
    {#if !$won_jackpot}

        <Button buttonText="End game with <br>{formatCurrency($user_cash_prize)}" style="text-xl" on:click={claimPrize} />
        
        {#if optionSelected && !revealAnswer }
            <Button buttonText="Is that your final answer?" style="text-xl" on:click={finalizeAnswer} />
        {/if}
        {#if showProceedButton}
            <Button buttonText="Next Question" style="text-xl" on:click={nextQuestion} />
        {/if}

    {:else}

        <Button buttonText="Congratulations! You've won the jackpot prize of <br>{formatCurrency($user_cash_prize)}" style="text-xl" on:click={claimPrize} />

    {/if}
</div>
