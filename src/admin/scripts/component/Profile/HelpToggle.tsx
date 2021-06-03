import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Radio } from 'antd';

import { helpToggle } from '../../store/ui/actions';

const HelpToggle = () => {
	const store = useSelector((store: any) => store);
	const [help, setHelp] = useState(store.ui.help);
	const dispatch = useDispatch();

	const onChangeHandler = (key) => {
		console.log('key', key);
		setHelp(key);
		dispatch(helpToggle(String(key)));
	};

	useEffect(() => {
		setHelp(store.ui.help);
	}, [store.ui.help]);

	return (
		<Radio.Group
			options={[
				{
					value: 'true',
					label: 'Yes',
				},
				{
					value: 'false',
					label: 'No',
				},
			]}
			onChange={(e) => onChangeHandler(e.target.value)}
			value={help}
			optionType="button"
		/>
	);
};

export default HelpToggle;
