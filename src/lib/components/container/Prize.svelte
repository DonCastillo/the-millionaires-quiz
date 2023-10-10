<script lang="ts">
	import { formatCurrency } from "$lib/utils/format";

	export let number: number = 1;
	export let price: number = 0;
	export let isHighlighted: boolean = false;
</script>

<div class="prize-tab-outer mb-2">
	<div
		class="prize-tab {isHighlighted ? 'prize-highlighted text-black' : 'bg-primary-2 text-white'} 
        flex flex-row items-center text-2xl font-normal-regular py-1 px-20 sm:px-10"
	>
		<div class="flex items-center mr-3">
            <div class="w-[35px]">{number}</div> 
            <div class="w-[15px]">
                {#if (price === 1000 || price === 32000 || price === 1000000)}
                    <i class="fa-solid fa-diamond text-xs text-white"></i>
                {/if}
            </div>
        </div>
		<div class="flex-1">{formatCurrency(price)}</div>
	</div>
</div>

<style>
    .prize-tab-outer {
        clip-path: polygon(10% 0%, 90% 0, 95% 50%, 90% 100%, 10% 100%, 5% 50%);
        background-color: white;
    }
	.prize-tab {
		clip-path: polygon(10.37% 7.5%, 89.63% 5%, 93.85% 50%, 89.63% 92.50%, 10.37% 92.5%, 6.15% 50%);
	}
</style>
