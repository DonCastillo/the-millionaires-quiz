<script lang="ts">
    import MoneyTree from "$lib/components/moneytree/MoneyTree.svelte";
    import Modal from "../lib/components/modal/Modal.svelte";
    console.log("Hello from +page.svelte");
</script>

<section class="container max-w-[1124px] bg-orange-100 p-5 mx-5 min-h-[500px]">
    <div class="flex flex-col sm:flex-row h-full">
        <div class="bg-blue-700 sm:w-3/5 lg:w-2/3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum veniam fugit expedita, sint odio minus animi! Incidunt sed doloribus dolores! Perferendis iusto aspernatur provident rem! Quae accusantium aliquam non magni.
        </div>
        <div class="bg-blue-500 sm:w-2/5 lg:w-1/3">
            <MoneyTree />
        </div>
    </div>
</section>
