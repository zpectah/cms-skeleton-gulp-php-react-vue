import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Radio } from 'antd';

import { themeToggle } from '../../store/ui/actions';

interface ThemeToggleProps {}

const ThemeToggle: React.FC<ThemeToggleProps> = () => {
	const store = useSelector((store: any) => store);
	const [theme, setTheme] = useState(store.ui.theme);
	const dispatch = useDispatch();

	const onChangeHandler = (key) => {
		setTheme(key);
		dispatch(themeToggle(key));
	};

	const themeOptions = ['default', 'dark'];

	return (
		<Radio.Group
			options={themeOptions}
			onChange={(e) => onChangeHandler(e.target.value)}
			value={theme}
			optionType="button"
		/>
	);
};

export default ThemeToggle;
