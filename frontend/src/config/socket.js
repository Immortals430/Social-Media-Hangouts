import { io } from "socket.io-client";

const URL = import.meta.env.VITE_APP_SOCKET_URL || "http://localhost:5000";

export let socket;

export const connectSocket = () => {
  socket = io(URL);
};
