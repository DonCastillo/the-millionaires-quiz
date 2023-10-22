<script lang="ts">
	import { question_mode } from '$lib/store/main';
	import { formatCurrency } from '$lib/utils/utils';
	import { user_name, won_jackpot } from '$lib/store/main';
	import { user_cash_prize } from '$lib/store/main';
	import type QuestionInterface from "$lib/interfaces/question.interface";
	import Button from "../container/Button.svelte";
	import Hexagon from "../container/Hexagon.svelte";
	import Option from "./Option.svelte";
	import { createEventDispatcher, onMount } from "svelte";
	import Lifeline from '../container/Lifeline.svelte';
	import { getLifeline } from '$lib/utils/type';
	import { goto } from '$app/navigation';
	import { Mode } from '$lib/constants/mode.constants.js';
	import { getLifelines, useAskTheAudience, useFiftyFifty } from '$lib/utils/lifeline';
	import { LifelineName } from '$lib/constants/lifeline.constants';
	import type ChoiceInterface from '$lib/interfaces/choice.interface';
	const dispatch = createEventDispatcher();
	const letters = ["A", "B", "C", "D"];

	export let questions: QuestionInterface[] = [];
	let questionIndex: number = 0;
	let optionSelected: string | null = null;
    let revealAnswer: boolean = false;
    let message: string = "";
    let showProceedButton: boolean = false;
    let disabledOptions: string[] = [];
    let lifelines = $question_mode ? getLifelines($question_mode) : getLifelines(Mode.NORMAL)

	$: currentQuestionObject = questions[questionIndex % questions.length];
    $: currentQuestion = currentQuestionObject?.question;
    $: currentOptions = currentQuestionObject?.choices;
    $: console.log("current options: ", currentOptions);
    $: console.log("lifelines: ", lifelines);

    // console.log("questions loaded inside the component: ", questions);
    // $: console.log("option selected----: ", optionSelected )
    // $: console.log("current question ----: ", currentQuestion );
    // $: console.log("choices: ", currentQuestion.choices)
	$: correctAnswer = currentOptions.find((choice) => choice.isCorrect)?.label;

    onMount(() => {
        if(!$user_name) goto("/");
        if(!$question_mode) goto("/");
        resetParameters();
        // console.log("lifelines inside the Question component: ", lifelines);
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
        resetParameters();
    }

    const disabledAllOptions = () => {
        currentOptions = currentOptions?.map((choice) => {
            return {...choice, disabled: true}
        })
    }

    const disabledAnOption = (option: []) => {
        disabledOptions = option;
    }

    const disableLifeline = (lifeline: LifelineName) => {
        lifelines = lifelines.map((l) => {
            if(l.type === lifeline) {
                return {...l, disabled: true}
            }
            return l;
        })
    }

    const useLifeline = (event: any) => {
        console.log("+++++++++++")
        console.log('Event: ', event.detail.type);
        switch(event.detail.type) {
            case LifelineName.FIFTY_FIFTY:
                currentOptions = useFiftyFifty(currentOptions);
                disableLifeline(LifelineName.FIFTY_FIFTY);
                break;
            case LifelineName.ASK_THE_AUDIENCE:
                currentOptions = useAskTheAudience(currentOptions);
                disableLifeline(LifelineName.ASK_THE_AUDIENCE);
                break;
        }
    }

    const resetParameters = () => {
        questionIndex = 0;
        optionSelected = null;
        revealAnswer = false;
        message = "";
        showProceedButton = false;
        disabledOptions = [];
    }
</script>

<div class="flex flex-col sm:flex-row sm:items-center mb-4 px-10">
    <h2 class="w-full sm:w-1/2 text-left text-md font-heading-bold text-white mb-3 sm:mb-0 w-fullmax-w-[300px]">
        Contestant: {$user_name}
    </h2>
    <div class="w-full sm:w-1/2  flex flex-wrap justify-end gap-3">
        {#each lifelines as lifeline}
            <Lifeline 
                name={lifeline.name} 
                icon={lifeline.icon} 
                description={lifeline.description} 
                type={lifeline.type}
                disabled={lifeline.disabled}
                on:use={useLifeline}
            />
        {/each}
    </div>
</div>
<h3>
	<Hexagon style="w-full min-h-[150px] black-highlight cursor-default">
        {@html currentQuestion}
    </Hexagon>
</h3>

<div>
	{#each currentOptions as option, index}
		<Option
			optionLetter={letters[index]}
			optionText={option.label}
            isSelected={optionSelected === option.label}
            isAnswer={revealAnswer && (correctAnswer === option.label)}
            disabled={option.disabled}
            invisible={option.invisible}
            audienceVote={option.audience_vote}
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
