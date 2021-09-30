import socket from './socket.js';

var peerOffer = null;

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
    ],
    iceCandidatePoolSize: 10,
};
const peerConnection = new RTCPeerConnection(servers);

export const addTracksToPeerConnection = (stream) => {
    stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
    });
}


// let remoteStream = new MediaStream();
// // Pull tracks from remote stream, add to video stream
// peerConnection.ontrack = event => {
//     event.streams[0].getTracks().forEach(track => {
//         remoteStream.addTrack(track);
//     });
// };

export const addTracksToRemoteStream = (stream) => {
    peerConnection.ontrack = event => {
        event.streams[0].getTracks().forEach(track => {
            stream.addTrack(track);
        });
    };
}




socket.on('call-offer-exchange', (e) => {
    console.log('recving', e)
    peerOffer = e.offer;
})

socket.on('call-answer-exchange', (data) => {
    console.log(data)
    if (!peerConnection.currentRemoteDescription && data?.answer) {
        peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
    }
})

export const call = async () => {

    const offerDescription = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offerDescription);

    const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
    };
    socket.emit('call-offer', { offer })

    peerConnection.onicecandidate = iceEvent => {
        socket.emit('ice-candidate', iceEvent.candidate)
        console.log(iceEvent)
    }

    socket.on('ice-candidate-exchange', iceEvent => {
        peerConnection.addIceCandidate(iceEvent)
        console.log(iceEvent)
    })
}




export const answer = async () => {

    var answerCandidates = []

    peerConnection.onicecandidate = event => {
        event.candidate && answerCandidates.push(event.candidate.toJSON());
    };

    await peerConnection.setRemoteDescription(new RTCSessionDescription(peerOffer));
    const answerDescription = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answerDescription);

    const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
    };

    socket.emit('call-answer', { answer })

    peerConnection.onicecandidate = iceEvent => {
        socket.emit('ice-candidate', iceEvent.candidate)
        console.log(iceEvent)
    }

    socket.on('ice-candidate-exchange', iceEvent => {
        peerConnection.addIceCandidate(iceEvent)
        console.log(iceEvent)
    })
};




// async function call (){
//     // var offerCandidates = [];
//     // peerConnection.update(()=>peerConnection.onicecandidate = (event) => {event.candidate && offerCandidates.push(event.candidate.toJSON());});

//     var offerDescription = await $peerConnection.createOffer();
//     await $peerConnection.setLocalDescription(offerDescription);

//     var offer = {
//         sdp: offerDescription.sdp,
//         type: offerDescription.type,
//     }

//     socket.emit('call-offer',{offer}); //call-request

//     peerConnection.update((peerConnection)=>peerConnection.onicecandidate = (event) => {event.candidate && socket.emit('ice-candidate',event);});

//     socket.on('ice-candidate-exchange',iceEvent=>{
//         peerConnection.update((peerConnection)=>peerConnection.addIceCandidate(iceEvent)); //new RTCIceCandidate(JSON.parse(iceEvent.candidate))
//     })

//     socket.on('call-offer-exchange',(e)=>{
//         console.log('recving',e)
//     })

//     socket.on('call-answer-exchange',(data)=>{
//         console.log('answered',data)
//     })
// }