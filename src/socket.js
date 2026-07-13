import { io } from "socket.io-client";

//const socket = io("http://localhost:5000");
const socket = io("https://sneakerdrop-tz-server.vercel.app");

export default socket;