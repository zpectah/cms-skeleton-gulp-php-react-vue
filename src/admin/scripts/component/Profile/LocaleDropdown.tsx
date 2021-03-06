import React from 'react';
import styled from 'styled-components';
import { Menu, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import LanguageService from '../../service/LanguageService';

const Trigger = styled.div`
	width: 2.5rem;
	height: 2.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 2rem;
	right: 2rem;
	z-index: 50;
	text-transform: uppercase;
	background-color: rgb(200, 200, 200);
	border-radius: 2.5rem;
`;

const LocaleDropdown: React.FC<{}> = () => {
	const { i18n } = useTranslation();

	const toggleLanguage = (language: string) => {
		LanguageService.set(language);
		return i18n.changeLanguage(language);
	};

	const menu = (
		<Menu>
			{config.GLOBAL.CMS.LANG_LIST.map((lang) => (
				<Menu.Item key={lang}>
					<a onClick={() => toggleLanguage(lang)}>
						{config.LOCALES_LIST[lang].label}
					</a>
				</Menu.Item>
			))}
		</Menu>
	);

	return (
		<>
			<Dropdown overlay={menu} placement="bottomRight">
				<Trigger>{i18n.language}</Trigger>
			</Dropdown>
		</>
	);
};

export default LocaleDropdown;
