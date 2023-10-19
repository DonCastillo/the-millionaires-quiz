<script lang="ts">
	import { money_prices } from '$lib/store/main';
    import { user_cash_prize } from "$lib/store/main";
	import Prize from "$lib/components/container/Prize.svelte";
	import type MoneyTreeInterface from "$lib/interfaces/moneytree.interface";
   
    $: moneyTree = $money_prices.map((value, index) => {
        return {
            number: index + 1,
            price: value,
            isHighlighted: value == $user_cash_prize
        }
    });

    $: moneyTree.reverse();
</script>

<div class="">
    {#each moneyTree as { number, price, isHighlighted}}
        <Prize number={number} price={price} isHighlighted={isHighlighted} />
    {/each}
</div>