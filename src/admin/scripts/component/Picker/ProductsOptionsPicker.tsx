import React from 'react';
import { Select } from 'antd';

import { useProductsOptions } from '../../Market/hooks';

interface ProductsOptionsPickerProps {
	id?: string;
	value: string[];
	onChange: (value, option) => void;
	single?: boolean;
	ignoredId?: any[];
}

const ProductsOptionsPicker: React.FC<ProductsOptionsPickerProps> = ({
	id,
	value,
	onChange,
	single = false,
	ignoredId = [],
}) => {
	const { ProductsOptions } = useProductsOptions();

	const getOptions = () => {
		let o = [
			{
				key: 0,
				value: '',
				label: 'Select option',
				disabled: true,
			},
		];

		ProductsOptions?.map((option) => {
			o.push({
				key: option.id,
				value: option.id,
				label: option.name,
				disabled: false,
			});
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
			placeholder: 'Select option',
		};

		if (!single) {
			p = {
				...p,
				mode: 'multiple',
				placeholder: 'Select options',
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

export default ProductsOptionsPicker;
