<script lang="ts">
	import { goto } from "$app/navigation";
	import Button from "$lib/components/container/Button.svelte";
	import Score from "$lib/components/container/Score.svelte";
	import Loader from "$lib/components/loader/Loader.svelte";
	import { getScore, getScores } from "$lib/utils/score-api";

	/** @type {import('./$types').PageData} */
	export let data: any;    
</script>

{#await getScore(data.scoreId)}
    <Loader text="Loading Scores ..." />
{:then scores}
    {#if Object.keys(scores).length > 0}
        <section class="container max-w-[1124px] p-5 mx-5 mb-10 mt-10">
            <h2 class="text-white text-center mb-5 text-2xl color-selected-2 font-heading-regular">Your Score</h2>
            <Score username={scores.username} prize={scores.prize} date={scores.date} />
        </section>
    {/if}
{:catch error}
	<h3 class="font-heading-bold text-3xl mt-5 color-selected-2 text-center mb-10">
		{error.message}
	</h3>
{/await}

{#await getScores(10)}
    <Loader text="Loading Scores ..." />
{:then scores}
    {#if scores.length > 0}
        <h2 class="text-white text-center mb-5 text-2xl color-selected-2 font-heading-regular">Top Scorers</h2>
        <section class="container max-w-[1124px] p-5 mx-5 min-h-[500px]">
            {#each scores as {_id, prize, username, date}, i}
                <Score rank={i + 1} username={username} prize={prize} date={date} />
            {/each}
        </section>
    {:else}
        <h3 class="font-heading-bold text-3xl mt-5 color-selected-2 text-center">
            No scores found
        </h3>
        <Button buttonText="Play Now!" style="max-w-[200px] mt-10" on:click={() => goto("/")}/>
    {/if}
{:catch error}
	<h3 class="font-heading-bold text-3xl mt-5 color-selected-2 text-center mb-10">
		{error.message}
	</h3>
{/await}



