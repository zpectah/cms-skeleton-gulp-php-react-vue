import React, { useState } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';

import OPTIONS from '../../../../config/options.json';
import NUMS from '../../../../config/nums.json';
import { Button } from '../ui';

const Wrapper = styled.div`
	width: 100%;
	display: flex;
`;

interface LanguageInstallerProps {
	installed: string[];
	afterInstall?: Function;
}

const LanguageInstaller: React.FC<LanguageInstallerProps> = (props) => {
	const { installed, afterInstall } = props;
	const { Option } = Select;
	const [loading, setLoading] = useState<boolean>(false);
	const [langToInstall, setLangToInstall] = useState<string[]>([]);

	const renderOptions = () => {
		return OPTIONS.language.available.map((item) => {
			let disabled = false;
			installed.map((sub) => {
				if (item === sub) disabled = true;
			});
			return (
				<Option key={item} value={item} disabled={disabled}>
					({item}) {NUMS.languageTitle[item]}
				</Option>
			);
		});
	};

	const installHandler = () => {
		setLoading(true);
		let na = [...installed, ...langToInstall];
		console.log(na);

		setTimeout(() => {
			if (afterInstall) afterInstall(na);
			setLangToInstall([]);
			setLoading(false);
		}, 1000);
	};

	return (
		<Wrapper>
			<Select
				mode="multiple"
				allowClear
				style={{ width: '100%' }}
				placeholder="Select new languages to install"
				value={langToInstall}
				onChange={(value) => setLangToInstall(value)}
			>
				{renderOptions()}
			</Select>
			<Button.Base
				type="primary"
				onClick={installHandler}
				disabled={langToInstall.length === 0}
				loading={loading}
			>
				Install
			</Button.Base>
		</Wrapper>
	);
};

export default LanguageInstaller;
