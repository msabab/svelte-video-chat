<script>
	import { onMount } from "svelte";
	import { roomId } from "./roomId.js";
	import { userId } from "./userId.js";
	import Video from "./Video.svelte";
	import RemoteVideo from "./RemoteVideo.svelte";
	import ChatMessages from "./ChatMessages.svelte";
	import socket from "./socket";
	import { call, answer } from "./call.js"; //hangup,sendVideo

	let typedMessage = "";
	let receivedMessages = [];
	let connectedUsers = [];

	socket.on("user-connected", ({ userId, userName }) => {
		console.log(`user ${userId} with the name of ${userName} connected`);
		connectedUsers = [...connectedUsers, { userId, userName }];
	});

	// onMount(() => {
	// 	socket.emit("join-room-request", { roomId, userId });
	// });

	const sendMessage = () => {
		socket.emit("text-message", { message: typedMessage });
		receivedMessages = [
			{ message: typedMessage, sender: 0 },
			...receivedMessages,
		];
		typedMessage = "";
	};

	socket.on("text-message", (data) => {
		console.log(data);
		receivedMessages = [data, ...receivedMessages];
	});
</script>

<div class="flex flex-col my-4 relative">
	<h5>
		Room {$roomId}
	</h5>
	<!-- only my video, calling, connected, 2, 3, 4 people-->
	<div class="grid grid-flow-col grid-cols-2">
		<Video />
		{#each connectedUsers as connectedUser}
			<div>
				<RemoteVideo />
				<p>{connectedUser.userId}</p>
			</div>
		{/each}
	</div>
	<ChatMessages {receivedMessages} />
	<div class="send-container fixed bottom-0 left-0 right-0">
		<input
			placeholder="Type your message here..."
			class="auto-height m-1 py-2 px-4 rounded-2xl font-medium text-lg bg-gray-200 focus:bg-gray-100 text-gray-800 focus:outline-none transition-all "
			bind:value={typedMessage}
		/>
		<button on:click={sendMessage} class="m-1 p-2 rounded-2xl">Send</button>
	</div>
</div>

<button on:click={call}>Call</button>
<button on:click={answer}>Answer</button>
<style lang="postcss">
	.send-container {
		display: grid;
		grid-template-columns: 1fr max-content;
		margin: 0.5em;
	}
	.auto-height {
		height: max-content;
	}
</style>
