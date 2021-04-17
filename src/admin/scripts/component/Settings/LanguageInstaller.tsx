import React, { useState } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';

import OPTIONS from '../../../../config/options.json';
import NUMS from '../../../../config/nums.json';

const Wrapper = styled.div``;

interface LanguageInstallerProps {
	installed: string[];
	afterInstall?: Function;
}

const LanguageInstaller: React.FC<LanguageInstallerProps> = (props) => {
	const { installed, afterInstall } = props;
	const { Option } = Select;
	const [langToInstall, setLangToInstall] = useState<any>([]);

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
		console.log('installed', installed);
		console.log('langToInstall', langToInstall);
		let na = [...installed, ...langToInstall];
		console.log('na', na);
		if (afterInstall) afterInstall(na);
		setLangToInstall([]);
	};

	return (
		<Wrapper>
			<div>Select and install new language ... </div>
			<br />
			<Select
				mode="multiple"
				allowClear
				style={{ width: '100%' }}
				placeholder="Please select"
				value={langToInstall}
				onChange={(value) => setLangToInstall(value)}
			>
				{renderOptions()}
			</Select>
			<br />
			<button type="button" onClick={installHandler}>
				Install
			</button>
		</Wrapper>
	);
};

export default LanguageInstaller;
