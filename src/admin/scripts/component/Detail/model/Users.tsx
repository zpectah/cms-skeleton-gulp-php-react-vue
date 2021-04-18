import React from 'react';

import { Modal, Typography } from '../../ui';

interface UsersDetailProps {
	detailData: any;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
}

const UsersDetail: React.FC<UsersDetailProps> = (props) => {
	const { detailData, onCancel, onSave, onDelete } = props;

	// TODO
	const model = detailData;

	return (
		<>
			<Modal.Header>
				<Typography.Title level={'h3'} noMargin>
					{detailData.email}
				</Typography.Title>
			</Modal.Header>
			<Modal.Content>
				UsersDetail ... {JSON.stringify(detailData)}
			</Modal.Content>
			<Modal.Footer>
				<button type="button" onClick={() => onCancel()}>
					close
				</button>
				<button type="button" onClick={() => onSave(model)}>
					save
				</button>
				<button type="button" onClick={() => onDelete(model)}>
					delete
				</button>
			</Modal.Footer>
		</>
	);
};

export default UsersDetail;
