<script>
	import { roomId } from "./roomId";
	import { userId } from "./userId";
	import Enter from "./Enter.svelte";
	import Room from "./Room.svelte";
</script>

<main class="grid gap-2 my-4 mx-2 md:mx-3 lg:mx-4 xl:mx-8 h-full">
	<h1>WebRTC Video Chat</h1>
	<h6>a completely free peer to peer video chat and conference tool</h6>
	{#if $userId}
		<!-- <h6>logged in as {$userId}</h6> -->
		<h6>connected</h6>
	{/if}
	<!-- <h2>
		{$roomId}
	</h2>
	<h3>h3</h3>
	<h4>h4</h4>
	<h5>h5</h5>
	<h6>h6</h6> -->
	{#if !$roomId}
		<Enter />
	{:else}
		<Room />
	{/if}
</main>

<style lang="postcss" global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	body {
		@apply bg-gray-300 dark:bg-gray-900;
	}

	h1 {
		@apply text-4xl md:text-4xl lg:text-6xl font-bold text-gray-800 dark:text-gray-400;
	}
	h2 {
		@apply text-3xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-400;
	}
	h3 {
		@apply text-2xl md:text-2xl font-semibold text-gray-800 dark:text-gray-400;
	}
	h4 {
		@apply text-xl md:text-lg font-semibold text-gray-800 dark:text-gray-400;
	}
	h5 {
		@apply text-sm md:text-sm font-medium text-gray-800 dark:text-gray-400;
	}
	h6 {
		@apply text-xs md:text-xs font-medium text-gray-800 dark:text-gray-400;
	}
	p {
		@apply text-base md:text-base font-normal text-gray-800 dark:text-gray-300;
	}

	button {
		@apply text-lg md:text-xl font-semibold m-2 px-8 py-2 rounded-md bg-green-800 dark:bg-sky-900 hover:bg-green-900 dark:hover:bg-sky-800 text-gray-200 dark:text-gray-300 shadow-sm hover:shadow-lg transition-all;
	}
</style>
