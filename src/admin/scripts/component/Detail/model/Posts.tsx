import React from 'react';

import { Modal, Typography } from '../../ui';

interface PostsDetailProps {
	detailData: any;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
}

const PostsDetail: React.FC<PostsDetailProps> = (props) => {
	const { detailData, onCancel, onSave, onDelete } = props;

	// TODO
	const model = detailData;

	return (
		<>
			<Modal.Header>
				<Typography.Title level={'h3'} noMargin>
					{detailData.name}
				</Typography.Title>
			</Modal.Header>
			<Modal.Content>PostDetail ... {JSON.stringify(detailData)}</Modal.Content>
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

export default PostsDetail;
