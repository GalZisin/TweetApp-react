import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import i18next from 'i18next'
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import { ConfirmProvider } from 'material-ui-confirm';
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'


// import i18n (needs to be bundled ;))
// import './utils/i18n'

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ru'],
    fallbackLng: 'en',
    debug: false,
    // Options for language detector
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    },
    // react: { useSuspense: false },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  })

const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading..</h3>
  </div>
)

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={loadingMarkup}>
      <ConfirmProvider>
        <App />
      </ConfirmProvider>
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
