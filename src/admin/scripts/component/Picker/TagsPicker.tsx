import React from 'react';
import { Select } from 'antd';

import { useTags } from '../../App/hooks';

interface TagsPickerProps {
	id?: string;
	value: string[];
	onChange: (value, option) => void;
	single?: boolean;
}

const TagsPicker: React.FC<TagsPickerProps> = ({
	id,
	value,
	onChange,
	single = false,
}) => {
	const { Tags } = useTags();

	const getOptions = () => {
		let o = [
			{
				key: 0,
				value: '',
				label: single ? 'Select tag' : 'Select tags',
				disabled: true,
			},
		];

		Tags?.map((option) => {
			o.push({
				key: option.id,
				value: option.id,
				label: option.name,
				disabled: false,
			});
		});

		return o;
	};

	const getVariableProps = () => {
		let p: any = {
			placeholder: 'Select tag',
		};

		if (!single) {
			p = {
				...p,
				mode: 'multiple',
				placeholder: 'Select tags',
			};
		}

		return p;
	};

	return (
		<Select
			style={{ width: '100%' }}
			id={id}
			value={value}
			onChange={(value, option) => onChange(value, option)}
			options={getOptions()}
			allowClear
			{...getVariableProps()}
		/>
	);
};

export default TagsPicker;
