import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { Radio } from 'antd';
import styled from 'styled-components';

import CFG from '../../../../config/global.json';
import LanguageService from '../../service/LanguageService';

const Wrapper = styled.div``;

interface LanguageToggleProps {}

const Toggle: React.FC<LanguageToggleProps> = (props) => {
	const { i18n } = useTranslation();
	const { control, handleSubmit } = useForm({
		mode: 'onChange',
		defaultValues: {
			language: i18n.language,
		},
	});

	const toggleLanguage = (language: string) => {
		LanguageService.set(language);
		return i18n.changeLanguage(language);
	};

	return (
		<Wrapper>
			<form onChange={handleSubmit((data) => toggleLanguage(data.language))}>
				<Controller
					control={control}
					name={'language'}
					render={({ onChange, value, name }) => (
						<Radio.Group
							name={name}
							options={CFG.CMS.LANG_LIST}
							onChange={(e) => onChange(e.target.value)}
							value={value}
							optionType="button"
						/>
					)}
				/>
			</form>
		</Wrapper>
	);
};

export default Toggle;
