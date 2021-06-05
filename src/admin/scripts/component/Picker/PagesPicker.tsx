import React from 'react';
import { Select } from 'antd';

import { usePages } from '../../App/hooks';

interface PagesPickerProps {
	id?: string;
	value: string[];
	onChange: (value, option) => void;
	single?: boolean;
	ignoredId?: any[];
	customOptions?: any[];
	pathPrefix?: string;
}

const PagesPicker: React.FC<PagesPickerProps> = ({
	id,
	value,
	onChange,
	single = false,
	ignoredId = [],
	customOptions = [],
	pathPrefix,
}) => {
	const { Pages } = usePages();

	const getOptions = () => {
		let o = [
			{
				key: 0,
				value: '',
				label: 'Select page',
				disabled: true,
			},
		];

		if (!single) o[0].label = 'Select pages';

		if (customOptions.length > 0) {
			customOptions.map((item) => {
				o.push(item);
			});
		}

		Pages?.map((option) => {
			let value = pathPrefix ? `${pathPrefix}${option.name}` : option.name;
			o.push({
				key: option.id,
				value: value,
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
			placeholder: 'Select page',
		};

		if (!single) {
			p = {
				...p,
				mode: 'multiple',
				placeholder: 'Select pages',
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

export default PagesPicker;
