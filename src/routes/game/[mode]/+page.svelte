<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data: any;
	import MoneyTree from "$lib/components/moneytree/MoneyTree.svelte";
	import Question from "$lib/components/question/Question.svelte";
	import { onMount } from "svelte";
	import {
		deleteToken,
		getCategories,
		getQuestions,
		getToken,
	} from "$lib/utils/api";
	import {
		user_name,
		access_token,
		easy_questions,
		medium_questions,
		hard_questions,
	} from "$lib/store/main";
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
	$: moneyTree = mode === Mode.PIGLATIN ? MoneyTreePigLatin : MoneyTreeNormal;
	$: questionsPromise = $access_token ? [
		getQuestions($access_token, 5, Difficulty.EASY),
		getQuestions($access_token, 5, Difficulty.MEDIUM),
		getQuestions($access_token, 5, Difficulty.HARD),
	] : null;

	// const questions =
	// 	"lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates ?";
	// const options = [
	// 	{ label: "Choice A", isCorrect: false },
	// 	{ label: "Choice B lorem ipsum dolor sit amet consectetur adipisicing elit.", isCorrect: false },
	// 	{ label: "Choice C", isCorrect: true },
	// 	{ label: "Choice D", isCorrect: false },
	// ];
	const correct = () => {
		console.log("Correct");
	};
	const incorrect = () => {
		console.log("Incorrect");
	};

	onMount(async () => {
		// get token
		$access_token = await getToken();

		// retrieve questions
		if(questionsPromise) {
			questions = await Promise.all(questionsPromise).then(results => [...results[0], ...results[1], ...results[2]])
		}

		// piglatinize questions
		if(mode === Mode.PIGLATIN) {
			questions = piglatinizeQuestions(questions);
		}
		
		// delete token
		await deleteToken($access_token);
	});
</script>

<section class="container max-w-[1124px] bg-orange-100 p-5 mx-5 min-h-[500px]">
	<div class="flex flex-col sm:flex-row h-full">
		<div class="bg-blue-700 sm:w-3/5 lg:w-2/3">
			<!-- <Question question={questions} options={options} on:correct={correct} on:incorrect={incorrect}/> -->
		</div>
		<div class="sm:w-2/5 lg:w-1/3">
			<MoneyTree moneyPrizes={moneyTree} />
		</div>
	</div>
</section>
