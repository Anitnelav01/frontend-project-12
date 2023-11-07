
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18n from "i18next";
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from "@rollbar/react";
import resources from "./locales/resources.js";
import { SocketContext } from "./contexts/index.jsx";
import { api } from "./contexts/socketContext.js";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./slices/index.js";


const init = () => {
  const censorshipDictionaryRu = leoProfanity.getDictionary('ru');
  leoProfanity.add(censorshipDictionaryRu);
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: "dev",
  };

  i18n
    .use(initReactI18next)
    .init({
        resources,
      fallbackLng: "ru",
      interpolation: {
        escapeValue: false,
    },
    });

  return (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <SocketContext.Provider value={api}>
            <App />
          </SocketContext.Provider>
        </I18nextProvider>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
  );
};

export { init };