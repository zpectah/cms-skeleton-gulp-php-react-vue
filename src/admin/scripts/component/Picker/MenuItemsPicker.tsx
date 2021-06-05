import React from 'react';
import { Select } from 'antd';

import { useMenuItems } from '../../App/hooks';

interface MenuItemsPickerProps {
	id?: string;
	value: string[];
	onChange: (value, option) => void;
	single?: boolean;
	ignoredId?: any[];
}

const MenuItemsPicker: React.FC<MenuItemsPickerProps> = ({
	id,
	value,
	onChange,
	single = false,
	ignoredId = [],
}) => {
	const { MenuItems } = useMenuItems();

	const getOptions = () => {
		let o = [
			{
				key: 0,
				value: '',
				label: 'Select MenuItems',
				disabled: true,
			},
		];

		MenuItems?.map((option) => {
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
			placeholder: 'Select MenuItems',
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
			allowClear
			{...getVariableProps()}
		/>
	);
};

export default MenuItemsPicker;
