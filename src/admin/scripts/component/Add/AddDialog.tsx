import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

import routes from '../../App/routes.json';
import { Modal } from '../../component/ui';

interface AddDialogProps {
	isOpen: boolean;
	onCancel: (event) => void;
}

const AddDialog: React.FC<AddDialogProps> = (props) => {
	const { isOpen, onCancel } = props;

	const modelList = [
		{
			key: 0,
			label: 'Create new post',
			path: routes.posts.pathDetail,
			active: true,
		},
		{
			key: 1,
			label: 'Create new user',
			path: routes.users.pathDetail,
			active: true,
		},
		{
			key: 2,
			label: 'Create new tag',
			path: routes.tags.pathDetail,
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

export default AddDialog;
