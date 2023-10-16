<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data: any;
	import MoneyTree from "$lib/components/moneytree/MoneyTree.svelte";
	import Question from "$lib/components/question/Question.svelte";
	import { onMount } from "svelte";
	import { money_prices, access_token, user_cash_prize, number_of_questions, won_jackpot } from '$lib/store/main';
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
	import { goto } from "$app/navigation";

	let questions: QuestionInterface[] = [];
	$: numOfQuestionsPerDifficulty = $number_of_questions / 3;
	$: mode = stringToMode(data?.mode);
	$: $money_prices = mode === Mode.PIGLATIN ? MoneyTreePigLatin : MoneyTreeNormal;
	$: questionsPromise = $access_token
		? [
				getQuestions($access_token, numOfQuestionsPerDifficulty, Difficulty.EASY),
				getQuestions($access_token, numOfQuestionsPerDifficulty, Difficulty.MEDIUM),
				getQuestions($access_token, numOfQuestionsPerDifficulty, Difficulty.HARD),
		  ]
		: null;

	
	const correct = (data: any) => {
		console.log("Correct");
		console.log("money prices: ", $money_prices);
		const questionIndex = data.detail.questionIndex;
		const moneyEarned = $money_prices[questionIndex];
		$user_cash_prize = moneyEarned;

		// determine if the jackpot has been won
		if(questionIndex === $number_of_questions - 1) {
			$won_jackpot = true;
		}
	};
	const incorrect = () => {
		console.log("Incorrect");
		// insert logic to look for safe heaven amounts
		
	};

	const claimPrize = () => {
		console.log("claiming prize ");
		console.log("moneys: ", $money_prices)
		let safeHavens = $money_prices.filter((price: number, index: number) => {
			if((index + 1) % 5 === 0) {
				return price;
			}
		});
		safeHavens = [0, ...safeHavens];
		safeHavens.reverse();
		console.log("safeheavens: ", safeHavens)
		const finalPrize = safeHavens.find((safeHaven: number) => safeHaven <= $user_cash_prize);
		

		console.log("user cash prize: ", $user_cash_prize);
		console.log("final prize: ", finalPrize);
		// safeHaven = [0, ...safeHaven];




		// console.log("safe haven: ", safeHaven);
		// save score to db
		// goto("/scoreboard");

	}

	onMount(async () => {
		// get token
		$user_cash_prize = 0;
		$access_token = await getToken();

		// retrieve questions
		if (questionsPromise) {
			questions = await Promise.all(questionsPromise)
				.then((results) => [
					...results[0],
					...results[1],
					...results[2],
				]);
		}

		// piglatinize questions
		if (mode === Mode.PIGLATIN) {
			questions = piglatinizeQuestions(questions);
		}

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
					on:claimprize={claimPrize}
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
