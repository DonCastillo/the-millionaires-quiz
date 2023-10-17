<script lang="ts">
	import { formatCurrency } from '$lib/utils/utils';
	import Hexagon from "./Hexagon.svelte";
    import moment from "moment";

    export let rank: number = 0;
    export let username: string;
    export let prize: number;
    export let date: string;
</script>

<Hexagon style="black-highlight leading-tight  min-h-auto w-full flex flex-col sm:flex-row sm:justify-evenly text-sm md:text-lg lg:text-xl px-[15%] sm:py-5 md:px-[15%]" disabled={true}>
    {#if rank > 0}<div class="flex-none text-left w-[30px] color-selected-2">{rank}:</div>{/if}
    <div class="flex-1 text-left">{username}</div>
    <div class="flex-1 text-left">{formatCurrency(prize)}</div>
    <div class="flex-1 text-center">{moment(date).format("MMM D, YYYY h:mm A")}</div>
</Hexagon>