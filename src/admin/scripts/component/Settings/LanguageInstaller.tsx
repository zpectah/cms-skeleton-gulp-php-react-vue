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
const StyledSelect = styled(Select)`
	width: calc(100% - 1rem);
	margin-right: 1rem;
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

		// TODO
		console.log(na);
		// request API

		setTimeout(() => {
			if (afterInstall) afterInstall(na);
			setLangToInstall([]);
			setLoading(false);
		}, 1000);
	};

	return (
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
				loading={loading}
			>
				Install
			</Button.Base>
		</Wrapper>
	);
};

export default LanguageInstaller;
