<script lang="ts">
	import Score from "$lib/components/container/Score.svelte";

	/** @type {import('./$types').PageData} */
	export let data: any;
    const userScore = data.userScore;
    const allScores = data.getAllScores;    
</script>


<section class="container max-w-[1124px] p-5 mx-5 mb-10 mt-10">
    <h2 class="text-white text-center mb-5 text-2xl color-selected-2 font-heading-regular">Your Score</h2>
    <Score username={userScore.username} prize={userScore.prize} date={userScore.date} />
</section>

<section class="container max-w-[1124px] p-5 mx-5 min-h-[500px]">
    {#each allScores as {_id, prize, username, date}, i}
        <Score rank={i + 1} username={username} prize={prize} date={date} />
    {/each}
</section>