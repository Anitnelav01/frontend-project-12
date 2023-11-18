/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    type: null,
    extra: null,
  },
  reducers: {
    openModal(state, { payload: { type, id } }) {
      state.isOpened = true;
      state.type = type;
      state.extra = id ?? null;
    },
    closeModal(state) {
      state.isOpened = false;
      state.type = null;
      state.extra = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
