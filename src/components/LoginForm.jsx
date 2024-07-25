import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LoginForm = ({ onLogin, loading, error }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('email')}
        className={`input ${!validateEmail(email) && email ? 'input-error' : ''}`}
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t('password')}
        className={`input ${password.length < 3 && password ? 'input-error' : ''}`}
        required
      />
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="submit-button">
        {loading ? <span className="loader"></span> : t('login')}
      </button>
    </form>
  );
};

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

export default LoginForm;
