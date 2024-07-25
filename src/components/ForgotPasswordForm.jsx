import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ForgotPasswordForm = ({ onForgotPassword, loading, error }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onForgotPassword(email);
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
      <button type="submit" className="submit-button">
        {loading ? <span className="loader"></span> : t('restorePassword')}
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

export default ForgotPasswordForm;
