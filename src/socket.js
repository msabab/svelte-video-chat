import { userId } from "./userId";
import { io } from "socket.io-client";
const socket = io("http://LOCALHOST:3300");

socket.on("connected", ({ newUserId }) => {
    console.log("connected with userId", newUserId);
    userId.update(() => newUserId);
});


export default socket;