<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from "./Button.svelte";
    import Modal from '$lib/components/modal/Modal.svelte';
	import type { LifelineName } from '$lib/constants/lifeline.constants';
	const dispatch = createEventDispatcher();
	export let name: string | null = null;
	export let icon: string | null = null;
	export let description: string | null = null;
    export let type: LifelineName | null = null;
    export let disabled: boolean = false;
    let open: boolean = false;

    const clickHandler = () => {
        open = false;
        dispatch("use", { type })
        
    }
</script>

<button
	class="black-highlight text-white flex flex-col justify-center items-center rounded-full border h-[40px] w-[40px] md:h-[60px] md:w-[60px] p-2"
	title={name}
    disabled={disabled}
    on:click={() => open = true}
>
	<div class="mb-2">
		<i class="fa-solid {icon} text-xl md:text-3xl flex items-center justify-center" />
	</div>
</button>

{#if open}
    <div class="fixed top-0 left-0 bottom-0 right-0 h-screen w-screen overflow-hidden bg-primary-2 opacity-90 z-50 text-white"></div>
    <div class="fixed top-0 left-0 bottom-0 right-0 h-screen w-screen overflow-hidden flex items-center justify-center z-[99] text-white">
        <div class="w-full max-w-[600px] bg-primary-2 black-highlight p-10 relative">
            <button class="text-3xl absolute top-0 right-0 m-4 cursor-pointer">
                <i 
                    class="fa-solid fa-times" 
                    on:click={() => open = false} 
                    aria-roledescription="close"
                    role="button"
                    tabindex="0"
                    on:keydown 
                    on:keyup 
                    on:keypress>
                </i>
            </button>
            <i class="block fa-solid {icon} text-6xl flex items-center justify-center mb-4" />
            <h4 class="text-2xl font-heading-regular text-center">{name}</h4>
            <p class="text-xl font-normal-regular text-center">{description}</p>
            <Button buttonText="Use" style="text-xl mt-5" on:click={clickHandler} />
        </div>
    </div>
{/if}