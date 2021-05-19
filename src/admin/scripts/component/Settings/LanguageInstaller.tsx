import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { message, Select } from 'antd';
import styled from 'styled-components';

import config from '../../config';
import { Button } from '../ui';
import { useSettings } from '../../App/hooks';

const Wrapper = styled.div`
	width: 100%;
	display: flex;
`;
const StyledSelect = styled(Select)`
	width: calc(100% - 1rem);
	margin-right: 1rem;
`;

interface LanguageInstallerProps {
	installed: string[];
	afterInstall?: Function;
}

const LanguageInstaller: React.FC<LanguageInstallerProps> = (props) => {
	const { t } = useTranslation(['component']);
	const { installed, afterInstall } = props;
	const { Option } = Select;
	const [progress, setProgress] = useState<boolean>(false);
	const [langToInstall, setLangToInstall] = useState<string[]>([]);
	const { installLanguage } = useSettings();

	const renderOptions = () => {
		return config.OPTIONS.language.available.map((item) => {
			let disabled = false;
			installed.map((sub) => {
				if (item === sub) disabled = true;
			});
			return (
				<Option key={item} value={item} disabled={disabled}>
					({item}) {config.LOCALES_LIST[item].label}
				</Option>
			);
		});
	};

	useEffect(() => {
		return () => {};
	}, []);

	const installHandler = () => {
		setProgress(true);
		let na = [...installed, ...langToInstall];

		installLanguage({ installed: na, toInstall: langToInstall }).then((res) => {
			console.log(res);

			if (afterInstall) afterInstall(na);
			setProgress(false);
			setLangToInstall([]);
			// set to array returned from installation process (res.data.installed)
			langToInstall.map((lng) =>
				message.success(
					t('component:LanguageInstaller.message.success_installed', {
						lang: lng,
					}),
					2.5,
				),
			);
		});
	};

	return (
		<>
			<Wrapper>
				<StyledSelect
					mode="multiple"
					allowClear
					placeholder="Select new languages to install"
					value={langToInstall}
					onChange={(value) => setLangToInstall(value)}
				>
					{renderOptions()}
				</StyledSelect>
				<Button.Base
					type="primary"
					onClick={installHandler}
					disabled={langToInstall.length === 0}
					loading={progress}
				>
					Install
				</Button.Base>
			</Wrapper>
		</>
	);
};

export default LanguageInstaller;
