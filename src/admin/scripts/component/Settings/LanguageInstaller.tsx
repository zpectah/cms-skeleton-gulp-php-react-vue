import React, { useState } from 'react';
import { message, Select, Alert } from 'antd';
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
const Spacer = styled.div`
	width: 100%;
	height: 1rem;
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
			message.success('Languages was successfully installed', 2.5);
			// TODO: set error message when error from BE installation
		}, 1000);
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
					loading={loading}
				>
					Install
				</Button.Base>
			</Wrapper>
			<Spacer />
			<Alert
				message="This is an irreversible step, continue only if you know what you are doing."
				type="info"
			/>
		</>
	);
};

export default LanguageInstaller;
