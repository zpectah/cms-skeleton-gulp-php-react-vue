import React from 'react';
import { Select } from 'antd';

import { useTags } from '../../App/hooks';

interface TagsPickerProps {
	id?: string;
	value: string[];
	onChange: (value, option) => void;
}

const TagsPicker: React.FC<TagsPickerProps> = ({ id, value, onChange }) => {
	const { Tags } = useTags();

	const getOptions = () => {
		let o = [];
		Tags?.map((option) => {
			o.push({
				key: option.id,
				value: option.id,
				label: option.name,
			});
		});

		return o;
	};

	return (
		<Select
			mode="multiple"
			style={{ width: '100%' }}
			id={id}
			value={value}
			onChange={(value, option) => onChange(value, option)}
			placeholder={'Select tags'}
			options={getOptions()}
		/>
	);
};

export default TagsPicker;
