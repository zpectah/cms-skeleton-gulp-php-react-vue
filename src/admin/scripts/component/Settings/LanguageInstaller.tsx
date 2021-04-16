import React from 'react';
import { Select } from 'antd';
import styled from 'styled-components';

import OPTIONS from '../../../../config/options.json';
import NUMS from '../../../../config/nums.json';

const Wrapper = styled.div``;

interface LanguageInstallerProps {
	installed: string[];
}

const LanguageInstaller: React.FC<LanguageInstallerProps> = (props) => {
	const { installed } = props;
	const { Option } = Select;

	const getAvailableList = () => {
		let list = [];

		OPTIONS.language.available.map((item) => {
			installed.map((sub) => {
				if (item !== sub) list.push(item);
			});
		});

		return list;
	};

	const renderOptions = () => {
		return OPTIONS.language.available.map((item) => {
			let disabled = false;
			installed.map((sub) => {
				if (item == sub) disabled = true;
			});
			return (
				<Option key={item} value={item} disabled={disabled}>
					({item}) {NUMS.languageTitle[item]}
				</Option>
			);
		});
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
				onChange={(value) => {
					console.log('value', value);
				}}
			>
				{renderOptions()}
			</Select>
			<br />
			button to install...
		</Wrapper>
	);
};

export default LanguageInstaller;
