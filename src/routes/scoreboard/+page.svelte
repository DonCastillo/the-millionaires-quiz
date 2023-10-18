<script lang="ts">
	import Score from "$lib/components/container/Score.svelte";
	import Loader from "$lib/components/loader/Loader.svelte";
	import axios from "axios";   
    const getAllScores = () => axios.get("/api/scores").then((res) => res.data.data)
</script>


<section class="container max-w-[1124px] p-5 mx-5 min-h-[500px]">
    
    {#await getAllScores()}
        <Loader text="Loading Scores ..." />
    {:then scores} 
        {#each scores as {_id, prize, username, date}, i}
            <Score rank={i + 1} username={username} prize={prize} date={date} />
        {/each}
    {/await}
    
</section>