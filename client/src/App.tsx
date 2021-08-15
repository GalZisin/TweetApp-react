import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import cookies from 'js-cookie'
import { useTranslation } from 'react-i18next';


export const languages = [
  {
    code: 'ru',
    name: 'Русский',
    country_code: 'ru',
  },
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  },

]

function App() {
  const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t } = useTranslation()
  useEffect(() => {
    document.title = t('app_title')
  }, [currentLanguage, t])


  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/profile/:id" component={ProfilePage} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
