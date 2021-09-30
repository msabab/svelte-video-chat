<script>
	import { roomId } from "./roomId";
	import { userId } from "./userId";

	import socket from "./socket";

	const connectToNewRoom = () => {
		socket.emit("create-new-room-request");

		socket.on("create-new-room-response", ({ newRoomId }) => {
			if (newRoomId) {
				// window.location.href = `/room/${data.roomId}`;
				roomId.update((n) => {
					console.log(newRoomId);
					return newRoomId;
				});
				socket.emit("join-room-request", {
					roomId: newRoomId,
					userId: $userId,
				});
			} else {
				alert("Failed to create new room");
			}
		});
	};
</script>

<div class="grid justify-items-center my-8 gap-4">
	<h2>You can either:</h2>
	<div class="grid sm:grid-cols-2">
		<button on:click={connectToNewRoom}> Create New Room </button>
		<button on:click={connectToNewRoom}> Join Existing Room </button>
	</div>
</div>

<!-- <button on:click={connectToNewRoom}> Join Room </button> -->
<style lang="postcss">
	/* button {
		@apply bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500;
	} */
	button {
		@apply px-2;
	}
</style>
