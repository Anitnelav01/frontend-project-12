
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18n from "i18next";
import leoProfanity from 'leo-profanity';
import resources from "./locales/resources.js";
import { SocketContext } from "./contexts/index.jsx";
import { api } from "./contexts/socketContext.js";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./slices/index.js";


const init = () => {
  const censorshipDictionaryRu = leoProfanity.getDictionary('ru');
  leoProfanity.add(censorshipDictionaryRu);

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
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SocketContext.Provider value={api}>
          <App />
        </SocketContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};

export { init };