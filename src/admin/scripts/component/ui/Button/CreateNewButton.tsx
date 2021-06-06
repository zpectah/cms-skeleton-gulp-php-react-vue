import React from 'react';
import { useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import { ROUTE_PATH_SUFFIX_DETAIL } from '../../../constants';
import BaseButton from './BaseButton';

interface CreateNewButtonProps {
	routePathPrefix: string;
	buttonText?: string;
}

const CreateNewButton: React.FC<CreateNewButtonProps> = (props) => {
	const history = useHistory();
	const { routePathPrefix, buttonText = 'Create new' } = props;

	return (
		<BaseButton
			key={1}
			type={'primary'}
			onClick={() => {
				history.push(routePathPrefix + ROUTE_PATH_SUFFIX_DETAIL + '/new');
			}}
			icon={<PlusOutlined />}
		>
			{buttonText}
		</BaseButton>
	);
};

export default CreateNewButton;
