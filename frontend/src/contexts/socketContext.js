import io from "socket.io-client";
import { addMessage } from "../slices/messagesSlice.js";
import store from '../slices/index.js';

const socket = io();

socket.on('newMessage', (payload) => {
    console.log(payload);
    store.dispatch(addMessage(payload));
});

export const api = {
    sendMessage: (message) => new Promise((resolve, reject) => {
  socket.emit('newMessage', message, (response) => {
    console.log(response);
    console.log(message);
  });
})
} 