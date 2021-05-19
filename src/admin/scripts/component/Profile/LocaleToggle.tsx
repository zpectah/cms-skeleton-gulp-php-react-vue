import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Radio } from 'antd';

import config from '../../config';
import LanguageService from '../../service/LanguageService';

const LocaleToggle: React.FC<{}> = () => {
	const { i18n } = useTranslation();
	const [lang, setLang] = useState<string>(i18n.language);

	const onChangeHandler = (language: string) => {
		setLang(language);
		LanguageService.set(language);
		return i18n.changeLanguage(language);
	};

	return (
		<Radio.Group
			options={config.GLOBAL.CMS.LANG_LIST}
			onChange={(e) => onChangeHandler(e.target.value)}
			value={lang}
			optionType="button"
		/>
	);
};

export default LocaleToggle;
