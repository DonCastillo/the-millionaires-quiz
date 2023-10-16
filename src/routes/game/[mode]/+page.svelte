<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data: any;
	import MoneyTree from "$lib/components/moneytree/MoneyTree.svelte";
	import Question from "$lib/components/question/Question.svelte";
	import { onMount } from "svelte";
	import { money_prices, access_token, user_cash_prize } from '$lib/store/main';
	import { deleteToken, getQuestions, getToken } from "$lib/utils/api";
	import { Difficulty } from "$lib/constants/difficulty.constants.js";
	import { Mode } from "$lib/constants/mode.constants";
	import { stringToMode } from "$lib/utils/type";
	import {
		MoneyTreeNormal,
		MoneyTreePigLatin,
	} from "$lib/constants/money-tree.constants";
	import type MoneyTreeInterface from "$lib/interfaces/moneytree.interface";
	import type QuestionInterface from "$lib/interfaces/question.interface";
	import { piglatin, piglatinizeQuestions } from "$lib/utils/piglatin";

	let questions: QuestionInterface[] = [];
	$: mode = stringToMode(data?.mode);
	$: $money_prices = mode === Mode.PIGLATIN ? MoneyTreePigLatin : MoneyTreeNormal;
	$: questionsPromise = $access_token
		? [
				getQuestions($access_token, 5, Difficulty.EASY),
				getQuestions($access_token, 5, Difficulty.MEDIUM),
				getQuestions($access_token, 5, Difficulty.HARD),
		  ]
		: null;

	// const questions =
	// 	"lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates ?";
	// const options = [
	// 	{ label: "Choice A", isCorrect: false },
	// 	{ label: "Choice B lorem ipsum dolor sit amet consectetur adipisicing elit.", isCorrect: false },
	// 	{ label: "Choice C", isCorrect: true },
	// 	{ label: "Choice D", isCorrect: false },
	// ];
	const correct = (data: any) => {
		console.log("Correct");
		console.log("money prices: ", $money_prices);
		const questionIndex = data.detail.questionIndex;
		const moneyEarned = $money_prices[questionIndex];
		$user_cash_prize = moneyEarned;
	};
	const incorrect = () => {
		console.log("Incorrect");
	};

	onMount(async () => {
		// get token
		$user_cash_prize = 0;
		$access_token = await getToken();

		// retrieve questions
		if (questionsPromise) {
			questions = await Promise.all(questionsPromise).then((results) => [
				...results[0],
				...results[1],
				...results[2],
			]);
		}

		// piglatinize questions
		if (mode === Mode.PIGLATIN) {
			questions = piglatinizeQuestions(questions);
		}

		// console.log("questions: ", questions);

		// delete token
		await deleteToken($access_token);
	});
</script>

<section class="container max-w-[1124px] bg-orange-100 p-5 mx-5 min-h-[500px]">
	<div class="flex flex-col sm:flex-row h-full">
		<div class="bg-blue-700 sm:w-3/5 lg:w-2/3">
			{#if questions.length > 0}
				<Question
					questions={questions}
					on:correct={correct}
					on:incorrect={incorrect}
				/>
			{/if}
			
		</div>
		<div class="sm:w-2/5 lg:w-1/3">
			{#if $money_prices.length > 0}
				<MoneyTree />
			{/if}
		</div>
	</div>
</section>
