/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { animateScroll } from 'react-scroll';

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
    addChannel(state, { payload }) {
      state.channels.push(payload);
      setTimeout(() => animateScroll.scrollToBottom({ containerId: 'channels-list', to: 'bottom', isDynamic: true }));
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
      }
    },
    renameChannel(state, { payload }) {
      const channel = state.channels.find(({ id }) => id === payload.id);
      channel.name = payload.name;
    },
  },
});

export const {
  loadChannels, addChannel, setCurrentChannel, removeChannel, renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
