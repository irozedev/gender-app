import React from 'react';
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const getButtonClass = (lng) => {
    return i18n.language === lng
      ? 'mx-2 p-2 bg-blue-700 text-white rounded flex items-center opacity-90'
      : 'mx-2 p-2 bg-blue-500 text-white rounded flex items-center opacity-70 hover:opacity-90';
  };

  return (
    <div className="flex justify-center my-4">
      <button onClick={() => changeLanguage('en')} className={getButtonClass('en')}>
        <Flag code="USA" className="w-6 h-4 mr-2" />
        EN
      </button>
      <button onClick={() => changeLanguage('ua')} className={getButtonClass('ua')}>
        <Flag code="UKR" className="w-6 h-4 mr-2" />
        УКР
      </button>
    </div>
  );
};

export default LanguageSwitcher;
