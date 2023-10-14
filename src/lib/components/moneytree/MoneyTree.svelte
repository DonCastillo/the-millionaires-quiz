<script lang="ts">
    import { user_cash_prize } from "$lib/store/main";
	import Prize from "$lib/components/container/Prize.svelte";
	import type MoneyTreeInterface from "$lib/interfaces/moneytree.interface";
    export let moneyPrizes: number[] = [];

   
    let moneyTree: MoneyTreeInterface[] = moneyPrizes.map((value, index) => {
        return {
            number: index + 1,
            price: value,
            isHighlighted: value == $user_cash_prize
        }
    });

    moneyTree.reverse();
</script>

<div class="bg-primary-2">
    {#each moneyTree as { number, price, isHighlighted}}
        <Prize number={number} price={price} isHighlighted={isHighlighted} />
    {/each}
</div>