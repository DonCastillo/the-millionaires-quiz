<script lang="ts">
	import MoneyTree from "$lib/components/moneytree/MoneyTree.svelte";
	import Question from "$lib/components/question/Question.svelte";
	import Modal from "../lib/components/modal/Modal.svelte";
	console.log("Hello from +page.svelte");
	const questions =
		"lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates ?";
	const options = [
		{ label: "Choice A", isCorrect: false },
		{ label: "Choice B lorem ipsum dolor sit amet consectetur adipisicing elit.", isCorrect: false },
		{ label: "Choice C", isCorrect: true },
		{ label: "Choice D", isCorrect: false },
	];
	const correct = () => {
		console.log("Correct");
	};
	const incorrect = () => {
		console.log("Incorrect");
	};
</script>

<section class="container max-w-[1124px] bg-orange-100 p-5 mx-5 min-h-[500px]">
	<div class="flex flex-col sm:flex-row h-full">
		<div class="bg-blue-700 sm:w-3/5 lg:w-2/3">
			<Question question={questions} options={options} on:correct={correct} on:incorrect={incorrect}/>
		</div>
		<div class="sm:w-2/5 lg:w-1/3">
			<MoneyTree />
		</div>
	</div>
</section>
