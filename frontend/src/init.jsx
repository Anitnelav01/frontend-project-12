import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { Provider } from 'react-redux';
import leoProfanity from 'leo-profanity';
import io from 'socket.io-client';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import resources from './locales/resources.js';
import { SocketContext } from './contexts/index.jsx';
import App from './App.jsx';
import store from './slices/index.js';
import {
  addChannel, removeChannel, renameChannel,
} from './slices/channelsSlice';
import { addMessage } from './slices/messagesSlice';

const init = () => {
  const censorshipDictionaryRu = leoProfanity.getDictionary('ru');
  leoProfanity.add(censorshipDictionaryRu);

  const rollbarConfig = {
    accessToken: process.env.TEST_REPORTER_ID,
    environment: 'testenv',
  };

  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel(payload));
  });

  const generateSocket = (type, data) => new Promise((resolve, reject) => {
    socket.timeout(5000).emit(type, data, (err, response) => {
      if (response?.status === 'ok') {
        resolve(response.data);
      } else {
        reject(err);
      }
    });
  });

  const sockets = {
    sendMessage: (message) => generateSocket('newMessage', message),
    addChannel: (channel) => generateSocket('newChannel', channel),
    removeChannel: (id) => generateSocket('removeChannel', id),
    renameChannel: (channel) => generateSocket('renameChannel', channel),
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <SocketContext.Provider value={sockets}>
              <App />
            </SocketContext.Provider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
