<script>
    import { createEventDispatcher } from 'svelte';
	import Backdrop from '$lib/components/modal/Backdrop.svelte';
    const dispatch = createEventDispatcher();
</script>

<Backdrop>
    <div class="w-full max-w-[600px] bg-primary-2 black-highlight p-10 relative">
        <button class="text-3xl absolute top-0 right-0 m-4 cursor-pointer">
            <i 
                class="fa-solid fa-times" 
                on:click={() => dispatch("close")} 
                aria-roledescription="close"
                role="button"
                tabindex="0"
                on:keydown 
                on:keyup 
                on:keypress>
            </i>
        </button>
        <slot></slot>
    </div>
</Backdrop>