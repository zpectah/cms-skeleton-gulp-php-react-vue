import React from 'react';
import { Select } from 'antd';

import { useCategories } from '../../../App/hooks';

interface CategoriesPickerProps {
	id?: string;
	value: string[];
	onChange: (value, option) => void;
	single?: boolean;
	ignoredId?: any[];
}

const CategoriesPicker: React.FC<CategoriesPickerProps> = ({
	id,
	value,
	onChange,
	single = false,
	ignoredId = [],
}) => {
	const { Categories } = useCategories();

	const getOptions = () => {
		let o = [
			{
				key: 0,
				value: '',
				label: 'Select category',
				disabled: true,
			},
		];
		Categories?.map((option) => {
			if (ignoredId.length > 0) {
				ignoredId.map((ignoredId) => {
					if (option.id !== ignoredId)
						o.push({
							key: option.id,
							value: option.id,
							label: option.name,
							disabled: false,
						});
				});
			} else {
				o.push({
					key: option.id,
					value: option.id,
					label: option.name,
					disabled: false,
				});
			}
		});

		return o;
	};

	const getVariableProps = () => {
		let p: any = {
			placeholder: 'Select category',
		};

		if (!single) {
			p = {
				...p,
				mode: 'multiple',
				placeholder: 'Select categories',
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
			{...getVariableProps()}
		/>
	);
};

export default CategoriesPicker;
