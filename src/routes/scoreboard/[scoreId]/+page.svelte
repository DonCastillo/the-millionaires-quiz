<script lang="ts">
	import Score from "$lib/components/container/Score.svelte";
	import Loader from "$lib/components/loader/Loader.svelte";
	import axios from "axios";

	/** @type {import('./$types').PageData} */
	export let data: any;
    
    const userScore = axios.get("/api/scores/" + data.scoreId).then((res) => res.data.data); 
    const allScores = axios.get("/api/scores").then((res) => res.data.data);
    const getAllScores = () => Promise.all([userScore, allScores]);
    console.log(getAllScores())
</script>

{#await getAllScores()}
    <Loader text="Loading Scores ..." />
{:then scores}
    <section class="container max-w-[1124px] p-5 mx-5 mb-10 mt-10">
        <h2 class="text-white text-center mb-5 text-2xl color-selected-2 font-heading-regular">Your Score</h2>
        <Score username={scores[0].username} prize={scores[0].prize} date={scores[0].date} />
    </section>

    <section class="container max-w-[1124px] p-5 mx-5 min-h-[500px]">
        {#each scores[1] as {_id, prize, username, date}, i}
            <Score rank={i + 1} username={username} prize={prize} date={date} />
        {/each}
    </section>
{/await}



