import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18next from 'i18next';
import WelcomeScreen from './components/WelcomeScreen';
import VotingScreen from './components/VotingScreen';
import MainScreen from './components/MainScreen';
import ReactGA from 'react-ga4';
import './index.css';
import LanguageSwitcher from './components/LanguageSwitcher';

// Инициализация i18next
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ua',
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie']
    },
    react: {
      useSuspense: false,
    },
  });

const TRACKING_ID = "UA-XXXXXXXXX-X"; // Замените на ваш идентификатор отслеживания
ReactGA.initialize(TRACKING_ID);

function App() {
  const { t } = useTranslation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    ReactGA.send("pageview");
    if (user && user.team) {
      setHasVoted(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const handleNicknameSubmit = (email, avatar) => {
    setUser({ email, avatar, team: null });
    ReactGA.event({
      category: 'User',
      action: 'Submitted Email',
      label: email
    });
  };

  const handleVote = async (team) => {
    const response = await fetch('http://localhost:3001/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, team }),
    });
    const result = await response.json();
    if (result.success) {
      setUser({ ...user, team });
      setHasVoted(true);
      ReactGA.event({
        category: 'Vote',
        action: 'Voted',
        label: team
      });
    } else {
      console.error(t('voteError'), result.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setHasVoted(false);
    localStorage.removeItem('user');
  };

  if (!user) {
    return <WelcomeScreen onNicknameSubmit={handleNicknameSubmit} />;
  }

  if (!hasVoted) {
    return <VotingScreen user={user} onVote={handleVote} />;
  }

  return <MainScreen user={user} onLogout={handleLogout} />;
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>
);
