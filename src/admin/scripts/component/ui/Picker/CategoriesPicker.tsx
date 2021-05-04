import React from 'react';
import { Select } from 'antd';

import { useCategories } from '../../../App/hooks';

interface CategoriesPickerProps {
	id?: string;
	value: string[];
	onChange: (value, option) => void;
}

const CategoriesPicker: React.FC<CategoriesPickerProps> = ({
	id,
	value,
	onChange,
}) => {
	const { Categories } = useCategories();

	const getOptions = () => {
		let o = [];
		Categories?.map((option) => {
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
			placeholder={'Select categories'}
			options={getOptions()}
		/>
	);
};

export default CategoriesPicker;
