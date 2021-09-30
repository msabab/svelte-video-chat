import { writable } from "svelte/store";

// export const peerConnections = writable([]);
var stunServers = {
    iceServers: [
        {
            urls: [
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
            ],
        },
    ],
    iceCandidatePoolSize: 10,
}

// export const peerConnection = writable(new RTCPeerConnection(stunServers))
