import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';

const Header = () => {
  const { t, i18n } = useTranslation();

  return (
    <header>
      <img src={logo} alt="Centime Logo" className='logo' />
      <h1>{t('header.title')}</h1>
      <select
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="p-1 border rounded"
        value={i18n.language}
      >
        <option value="en">{t('language.english')}</option>
        <option value="fr">{t('language.french')}</option>
      </select>
    </header>
  );
};

export default Header;
