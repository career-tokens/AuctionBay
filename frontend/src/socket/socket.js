import socketIO from "socket.io-client";
export const socket = socketIO.connect("https://realtime-auction-backend.onrender.com");
