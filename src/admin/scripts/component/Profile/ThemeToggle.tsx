import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Radio } from 'antd';

import { THEME_LIST } from '../../constants';
import { themeToggle } from '../../store/ui/actions';

const ThemeToggle: React.FC<{}> = () => {
	const store = useSelector((store: any) => store);
	const [theme, setTheme] = useState(store.ui.theme);
	const dispatch = useDispatch();

	const onChangeHandler = (key) => {
		setTheme(key);
		dispatch(themeToggle(key));
	};

	return (
		<Radio.Group
			options={THEME_LIST}
			onChange={(e) => onChangeHandler(e.target.value)}
			value={theme}
			optionType="button"
		/>
	);
};

export default ThemeToggle;
