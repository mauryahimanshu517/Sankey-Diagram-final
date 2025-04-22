import React from 'react';
import { useTranslation } from 'react-i18next';
import Logo from "../assets/centime.png";

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();

    return (
        <header className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
            <img src={Logo} alt="Centime Logo" className="h-10" style={{ height: "60px" }} />
            <h1 className="text-xl font-bold">{t('header.title')}</h1>
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