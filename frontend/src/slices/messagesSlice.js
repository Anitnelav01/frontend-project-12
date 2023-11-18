import { createSlice } from "@reduxjs/toolkit";
import { loadChannels, removeChannel } from './channelsSlice';

const messagesSlice = createSlice({
    name: 'messagesInfo',
    initialState: {
        messages: [],
    },
    reducers: {
        addMessage(state, { payload }) {
            state.messages.push(payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadChannels, (state, { payload: { messages }}) => {
                state.messages = messages;
            })
            .addCase(removeChannel, (state, { payload: { id }}) => {
                state.messages = state.messages.filter(({ channelId}) => channelId !== id);
            })
    }
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;