<script>
    import { onMount } from "svelte";
    import { addTracksToPeerConnection } from "./call.js";

    let video;

    onMount(async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ audio: true, video: true })
                .then(function (stream) {
                    if ("srcObject" in video) {
                        video.srcObject = stream;
                    } else {
                        video.src = window.URL.createObjectURL(stream);
                    }
                    video.onloadedmetadata = function (e) {
                        video.play();
                        video.muted = true;
                    };
                    addTracksToPeerConnection(stream);
                });
        }
    });
</script>

<div class="rounded-lg overflow-hidden">
    <video bind:this={video} class="w-full h-full">
        <track kind="captions" />
    </video>
</div>
