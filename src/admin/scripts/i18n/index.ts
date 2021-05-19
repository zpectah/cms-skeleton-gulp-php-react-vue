import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import config from '../config';
import LanguageService from '../service/LanguageService';
import { en, cs } from './resources';

const resources = {
	en: en,
	cs: cs,
};

i18n.use(initReactI18next).init({
	resources,
	defaultNS: 'common',
	lng: LanguageService.get(),
	fallbackLng: config.GLOBAL.CMS.LANG_LIST,
	react: {
		bindI18n: 'languageChanged',
		useSuspense: true,
	},
});

export default i18n;
