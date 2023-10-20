import { createSlice } from '@reduxjs/toolkit';

const defaultChannelId = 1;

const channelsSlice = createSlice({
    name: 'channelsInfo',
    initialState: {
        channels: [],
        currentChannelId: 1,
    },
    reducers: {
        loadChannels(state, { payload: { channels, currentChannelId } }) {
            state.channels = channels;
            state.currentChannelId = currentChannelId;
        },
        addChannel(state, { payload: { channel } }){
            state.newChannelId = channel.id;
            state.channels.push(channel);
        },
        setCurrentChannel(state, { payload: { id } }) {
            state.currentChannelId = id;
        },
        removeChannel(state, { payload: { id } }) {
            state.channels = state.channels.filter(
                (channel) => channel.id !== id,
              );
              if (state.currentChannelId === id) {
                state.currentChannelId = defaultChannelId;
              };
            },        
        },
        getCurrentChannel(state) {
            const { channels, /*currentChannelId*/ } = state.channels;
            return channels.find((channel) => channel.id === state.currentChannelId);
        },
});

export const { loadChannels, addChannel, setCurrentChannel, removeChannel, getCurrentChannel } = channelsSlice.actions;
export default channelsSlice.reducer;