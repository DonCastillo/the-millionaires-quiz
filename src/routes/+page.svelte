<script lang="ts">
	import {goto} from "$app/navigation";
	import Button from "$lib/components/container/Button.svelte";
	import Hexagon from "$lib/components/container/Hexagon.svelte";
	import { Mode } from "$lib/constants/mode.constants";
	import { user_name } from "$lib/store/main";

	console.log("This is the home page");
	const TEXTFIELD_NAME = "Enter your name here";

	let userName: string | null = null;
	let chosenMode: Mode | null = null;
	let message: string = "";
	
	$: normalHighlight = chosenMode === Mode.NORMAL ? 'yellow-highlight' : 'black-highlight';
	$: piglatinHighlight = chosenMode === Mode.PIGLATIN ? 'yellow-highlight' : 'black-highlight';
	$: normalHeading = chosenMode === Mode.NORMAL ? 'color-primary-2' : 'color-selected-1';
	$: piglatinHeading = chosenMode === Mode.PIGLATIN ? 'color-primary-2' : 'color-selected-1';

	const clickHandler = () => {
		message = "";
		if(!userName) message += "Please enter your name. <br />";
		if(!chosenMode) message += "Please choose a mode. <br />";
		if(message) return;
		$user_name = userName;
		goto(`/game/${chosenMode}`);
	};

	const toggleMode = (mode: Mode) => {
		if(chosenMode === mode) {
			chosenMode = null;
		} else {
			chosenMode = mode;
		}
	};
</script>

<section class="container max-w-[1124px] p-5 mx-5 min-h-[500px]">
	<div>
		<label
			for="username"
			class:invisible={!(userName !== null && userName.trim().length > 0)}
			class="block w-full text-2xl text-center text-white font-heading-bold mb-4"
			>{TEXTFIELD_NAME}
		</label>
		<input
			bind:value={userName}
			placeholder={TEXTFIELD_NAME}
			id="username"
			class="w-full text-2xl py-3 px-4 text-center font-heading-regular bg-transparent text-white border-2 border-white rounded-lg"
		/>
	</div>
	<div
		class="flex flex-col md:flex-row md:justify-stretch md:items-center gap-0 my-10"
	>
		<div class="w-full md:w-1/2">
			<Hexagon
				style="md:h-[350px] text-center flex flex-col items-center justify-center {normalHighlight}"
				on:click={() => toggleMode(Mode.NORMAL)}
			>
				<h3 class="font-heading-regular text-3xl mb-4 {normalHeading}">
					Normal Mode
				</h3>
				<p class="leading-6">
					Play this game normally. You will have 3 lifelines and you can win as
					much as $1 Million.
				</p>
			</Hexagon>
		</div>
		<div class="w-full md:w-1/2">
			<Hexagon
				style="md:h-[350px] text-center flex flex-col items-center justify-center {piglatinHighlight}"
				on:click={() => toggleMode(Mode.PIGLATIN)}
			>
				<h3 class="font-heading-regular text-3xl mb-4 {piglatinHeading}">
					Pig Latin Mode
				</h3>
				<p class="leading-6">
					Questions and choices will be translated into Pig Latin language. You
					will have 3 lifelines and the prize money each round is doubled the
					amount than the normal mode. You can win as much as $2 Million.
				</p>
			</Hexagon>
		</div>
	</div>

	{#if message}
		<div class="my-10 text-center text-red-300 text-xl font-heading-regular">
			{@html message}
		</div>
	{/if}

	<div>
		<Button buttonText="Start" on:click={clickHandler} />
	</div>
</section>
