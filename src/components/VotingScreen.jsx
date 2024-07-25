import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import './VotingScreen.css';

const VotingScreen = ({ user, onVote }) => {
  const { t } = useTranslation();
  const [error, setError] = useState('');

  const handleVote = async (team) => {
    const response = await fetch('http://localhost:3001/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, team }), // Используем email пользователя
    });
    const result = await response.json();
    if (result.success) {
      onVote(team);
    } else {
      setError(result.message);
      console.error('Ошибка голосования:', result.message);
    }
  };

  const resetError = () => {
    setError('');
  };

  return (
    <div className="voting-screen">
      <LanguageSwitcher />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">{t('boyOrGirl')}</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="flex space-x-4" onClick={resetError}>
          <button onClick={() => handleVote('boy')} className="vote-button bg-boy text-white">{t('boy')}</button>
          <button onClick={() => handleVote('girl')} className="vote-button bg-girl text-white">{t('girl')}</button>
        </div>
      </div>
    </div>
  );
};

export default VotingScreen;
