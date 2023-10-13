<script lang="ts">
	import Hexagon from "$lib/components/container/Hexagon.svelte";

	console.log("This is the home page");
	let userName: string | null = null;
	const TEXTFIELD_NAME = "Enter your name here";
	// $: userName = userName?.trim();
	$: console.log("userName: ", userName);
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
	<div class="flex flex-col md:flex-row md:justify-stretch md:items-center gap-0 my-10">
		<div class="w-full md:w-1/2">
			<Hexagon style={"md:h-[350px] text-center flex flex-col items-center justify-center"}>
				<h3 class="text-3xl mb-4">Normal Mode</h3>
				<p class="leading-6">Play this game normally. You will have 3 lifelines and you can win as much as $1 Million.</p>
			</Hexagon>
		</div>
		<div class="w-full md:w-1/2">
			<Hexagon style={"md:h-[350px] text-center flex flex-col items-center justify-center"}>
				<h3 class="text-3xl mb-4">Pig Latin Mode</h3>
				<p class="leading-6">Questions and choices will be translated into Pig Latin language. You will have 3 lifelines and the prize money each round is doubled the amount than the normal mode. You can win as much as $2 Million.</p>
			</Hexagon>
		</div>
		
	</div>
</section>



