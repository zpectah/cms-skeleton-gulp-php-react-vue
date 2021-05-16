import React from 'react';
import { Select } from 'antd';

import { useMenu } from '../../../App/hooks';

interface MenuPickerProps {
	id?: string;
	value: string[];
	onChange: (value, option) => void;
	single?: boolean;
	ignoredId?: any[];
}

const MenuPicker: React.FC<MenuPickerProps> = ({
	id,
	value,
	onChange,
	single = false,
	ignoredId = [],
}) => {
	const { Menu } = useMenu();

	const getOptions = () => {
		let o = [
			{
				key: 0,
				value: '',
				label: 'Select menu',
				disabled: true,
			},
		];

		Menu?.map((option) => {
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
			placeholder: 'Select menu',
		};

		if (!single) {
			p = {
				...p,
				mode: 'multiple',
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

export default MenuPicker;
