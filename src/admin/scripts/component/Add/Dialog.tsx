import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

import routes from '../../config.routes';
import { Modal } from '../../component/ui';

interface AddDialogProps {
	isOpen: boolean;
	onCancel: (event) => void;
}

const Dialog: React.FC<AddDialogProps> = (props) => {
	const { isOpen, onCancel } = props;

	const modelList = [
		{
			key: 0,
			label: 'Create new post',
			path: routes.app.posts.pathDetail,
			active: true,
		},
		{
			key: 1,
			label: 'Create new user',
			path: routes.app.users.pathDetail,
			active: true,
		},
		{
			key: 2,
			label: 'Create new tag',
			path: routes.app.tags.pathDetail,
			active: true,
		},
		{
			key: 3,
			label: 'Create new translation',
			path: routes.app.translations.pathDetail,
			active: true,
		},
		{
			key: 4,
			label: 'Create new category',
			path: routes.app.categories.pathDetail,
			active: true,
		},
	];

	const gridStyle: any = {
		width: '25%',
		textAlign: 'center',
	};

	return (
		<Modal.Base visible={isOpen} onCancel={onCancel}>
			<Modal.Header>... create new ...</Modal.Header>
			<Modal.Content>
				<Card>
					{modelList.map((item) => (
						<Card.Grid style={gridStyle} key={item.key}>
							<Link to={item.path + '/new'}>{item.label}</Link>
						</Card.Grid>
					))}
				</Card>
			</Modal.Content>
		</Modal.Base>
	);
};

export default Dialog;
