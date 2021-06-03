import React from 'react';
import { Select } from 'antd';

import { useCategories } from '../../App/hooks';

interface CategoriesPickerProps {
	id?: string;
	value: string[];
	onChange: (value, option) => void;
	single?: boolean;
	ignoredId?: any[];
	mode?: 'all' | 'category' | 'gallery';
}

const CategoriesPicker: React.FC<CategoriesPickerProps> = ({
	id,
	value,
	onChange,
	single = false,
	ignoredId = [],
	mode = 'all',
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
			switch (option.type) {
				case 'default':
					if (mode == 'category' || mode == 'all')
						o.push({
							key: option.id,
							value: option.id,
							label: option.name,
							disabled: false,
						});
					break;

				case 'gallery':
					if (mode == 'gallery' || mode == 'all')
						o.push({
							key: option.id,
							value: option.id,
							label: option.name,
							disabled: false,
						});
					break;
			}
		});

		if (ignoredId.length > 0) {
			let fo = [];

			o.map((oi) => {
				ignoredId.map((ignoredId) => {
					if (oi.key !== ignoredId) fo.push(oi);
				});
			});

			o = fo;
		}

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
