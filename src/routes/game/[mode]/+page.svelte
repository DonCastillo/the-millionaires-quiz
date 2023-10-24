<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data: any;
	import MoneyTree from "$lib/components/moneytree/MoneyTree.svelte";
	import Question from "$lib/components/question/Question.svelte";
	import { onMount } from "svelte";
	import {
		money_prices,
		access_token,
		user_cash_prize,
		number_of_questions,
		won_jackpot,
		user_name,
	} from "$lib/store/main";
	import { deleteToken, getQuestions, getToken } from "$lib/utils/quiz-api";
	import { Difficulty } from "$lib/constants/difficulty.constants.js";
	import { Mode } from "$lib/constants/mode.constants";
	import { stringToMode } from "$lib/utils/type";
	import {
		MoneyTreeNormal,
		MoneyTreePigLatin,
	} from "$lib/constants/money-tree.constants";
	import type QuestionInterface from "$lib/interfaces/question.interface";
	import { piglatinizeQuestions } from "$lib/utils/piglatin";
	import { goto } from "$app/navigation";
	import { submitScore } from "$lib/utils/score-api";
	import Loader from "$lib/components/loader/Loader.svelte";


	let questions: QuestionInterface[] = [];
	let loading: boolean = false;
	let loadingText: string = "";
	let errorMessage: string = "";
	$: numOfQuestionsPerDifficulty = $number_of_questions / 3;
	$: mode = stringToMode(data?.mode);
	$: $money_prices = mode === Mode.PIGLATIN ? MoneyTreePigLatin : MoneyTreeNormal;
	$: questionsPromise = $access_token
		? [
				getQuestions(
					$access_token,
					numOfQuestionsPerDifficulty,
					Difficulty.EASY
				),
				getQuestions(
					$access_token,
					numOfQuestionsPerDifficulty,
					Difficulty.MEDIUM
				),
				getQuestions(
					$access_token,
					numOfQuestionsPerDifficulty,
					Difficulty.HARD
				),
		  ]
		: null;

	const correct = (data: any) => {
		console.log("Correct");
		console.log("money prices: ", $money_prices);
		const questionIndex = data.detail.questionIndex;
		const moneyEarned = $money_prices[questionIndex];
		$user_cash_prize = moneyEarned;

		// determine if the jackpot has been won
		if (questionIndex === $number_of_questions - 1) {
			$won_jackpot = true;
		}
	};
	const incorrect = () => {
		console.log("Incorrect");
		// insert logic to look for safe heaven amounts
		let safeHavens = $money_prices.filter((price: number, index: number) => {
			if ((index + 1) % 5 === 0) {
				return price;
			}
		});
		safeHavens = [0, ...safeHavens];
		safeHavens.reverse();
		$user_cash_prize =
			safeHavens.find((safeHaven: number) => safeHaven <= $user_cash_prize) ||
			0;

		claimPrize();
	};

	const claimPrize = async () => {
		loading = true;
		loadingText = "Game is over.<br>Submitting score...";
		// safeHaven = [0, ...safeHaven];
		console.log("final prize: ", $user_cash_prize);
		const scoreID = await submitScore($user_name, $user_cash_prize);
		$user_name = "";
		$user_cash_prize = 0;
		// save score to db
		goto(`/scoreboard/${scoreID}`);
		loading = false;
		loadingText = "";
	};

	onMount(async () => {
		try {
			// get token
			errorMessage = "";
			loading = true;
			loadingText = "Loading questions...";
			if(!$user_name) goto("/");

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

			if(!questions) goto("/")

			console.log("Loaded Questions: ", questions);

			// piglatinize questions
			if (mode === Mode.PIGLATIN) {
				questions = piglatinizeQuestions(questions);
			}

			// delete token
			await deleteToken($access_token);
			loading = false;
			loadingText = "";
		} catch (error) {
			errorMessage = "Cannot load questions. Please refresh the page.";
		}

	});
</script>


<section class="container max-w-[1124px] p-5 mx-5 min-h-[500px]">
	<div class="flex flex-col sm:flex-row sm:items-center h-full">
		<div class="sm:w-3/5 lg:w-2/3">
			{#if questions && questions.length > 0}
				<Question
					{questions}
					on:correct={correct}
					on:incorrect={incorrect}
					on:claimprize={claimPrize}
				/>
			{/if}
			{#if errorMessage}
				<h3 class="font-heading-bold text-3xl mt-5 color-selected-2 text-center mb-10">
					{errorMessage}
				</h3>
			{/if}
		</div>
		<div class="sm:w-2/5 lg:w-1/3">
			{#if $money_prices.length > 0}
				<MoneyTree />
			{/if}
		</div>
	</div>
</section>

{#if loading}
	<Loader text={loadingText} />
{/if}