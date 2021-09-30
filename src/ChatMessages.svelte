<script>
    export let receivedMessages;
</script>

<div
    class=" flex flex-col-reverse justify-start my-8 h-48 overflow-y-scroll w-full"
>
    {#each receivedMessages as message}
        {#if message.sender == 0}
            <div
                class="bg-teal-600 my-1 mx-2 py-2 px-4 rounded-xl w-max min-w-max max-w-full self-end"
            >
                <p class="max-w-full">{message.message}</p>
            </div>
        {:else}
            <div
                class="bg-cyan-900 my-1 mx-2 py-2 px-4 rounded-xl w-max min-w-max max-w-full self-start"
            >
                <p class="max-w-full">{message.message}</p>
            </div>
        {/if}
    {/each}
</div>

<style>
</style>
