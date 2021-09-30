<script>
    import { onMount } from "svelte";
    import { addTracksToRemoteStream } from "./call.js";
    // import { peerConnection } from "./peerConnections";

    // let peerConnection = peerConnections[0];
    let remotestream;
    let video;

    onMount(async () => {
        remotestream = new MediaStream();

        addTracksToRemoteStream(remotestream);

        video.srcObject = remotestream;
        video.addEventListener("loadedmetadata", () => {
            video.play();
        });
    });
</script>

<div class="rounded-lg overflow-hidden">
    <video bind:this={video} class="w-full h-full">
        <track kind="captions" />
    </video>
</div>
