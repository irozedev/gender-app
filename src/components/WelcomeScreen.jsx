import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onNicknameSubmit }) => {
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.team) {
      onNicknameSubmit(user.email, user.avatar);
    }
    return () => setIsMounted(false);
  }, [onNicknameSubmit]);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (isMounted) {
        setLoading(false);
        if (result.success) {
          if (result.user.team) {
            onNicknameSubmit(email, result.user.avatar);
          } else {
            localStorage.setItem('user', JSON.stringify(result.user));
            onNicknameSubmit(email, result.user.avatar);
          }
        } else {
          setError(result.message);
        }
      }
    } catch (error) {
      if (isMounted) {
        setError(t('errorLogin'));
        setLoading(false);
      }
    }
  };

  const handleRegister = async (firstName, lastName, email, password, confirmPassword, avatar, gender) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, avatar, gender }),
      });
      const result = await response.json();
      if (isMounted) {
        setLoading(false);
        if (result.success) {
          onNicknameSubmit(email, avatar);
        } else {
          setError(result.message);
        }
      }
    } catch (error) {
      if (isMounted) {
        setError(t('errorRegister'));
        setLoading(false);
      }
    }
  };

  const handleForgotPassword = async (email) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (isMounted) {
        setLoading(false);
        if (result.success) {
          setError(t('successEmailSent'));
        } else {
          setError(result.message);
        }
      }
    } catch (error) {
      if (isMounted) {
        setError(t('errorRestorePassword'));
        setLoading(false);
      }
    }
  };

  const resetError = () => {
    setError('');
  };

  return (
    <div className="welcome-screen">
      <LanguageSwitcher />
      <div className="flex flex-col items-center justify-center h-screen w-full text-center">
        <h1 className="welcome-text text-2xl font-bold mb-4 text-white">
          <span>{t('welcome')} </span>
          <span>{t('toThe')} </span>
          <span>{t('genderRevealParty')} </span>
          <span>{t('of')} </span>
          <span>{t('stepanAndValeria')}</span>
        </h1>
        {forgotPassword ? (
          <>
            <ForgotPasswordForm onForgotPassword={handleForgotPassword} loading={loading} error={error} />
            <p className="toggle-auth mt-4" onClick={() => { setForgotPassword(false); resetError(); }}>{t('haveAccount')}</p>
          </>
        ) : (
          <>
            {isLogin ? (
              <LoginForm onLogin={handleLogin} loading={loading} error={error} />
            ) : (
              <RegisterForm onRegister={handleRegister} loading={loading} error={error} />
            )}
            <p className="toggle-auth mt-4" onClick={() => { setIsLogin(!isLogin); resetError(); }}>
              {isLogin ? t('noAccount') : t('haveAccount')}
            </p>
            {isLogin && <p className="toggle-auth mt-2" onClick={() => { setForgotPassword(true); resetError(); }}>{t('forgotPassword')}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;
