import React from 'react';

import { Modal, Typography } from '../../ui';

interface TagsDetailProps {
	detailData: any;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
}

const TagsDetail: React.FC<TagsDetailProps> = (props) => {
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
			<Modal.Content>TagsDetail ... {JSON.stringify(detailData)}</Modal.Content>
			<Modal.Footer>
				<button type="button" onClick={() => onCancel()}>
					close
				</button>
				{detailData && detailData.id !== 'new' && (
					<>
						<button type="button" onClick={() => onDelete(model)}>
							delete
						</button>
					</>
				)}
				<button type="button" onClick={() => onSave(model)}>
					save
				</button>
			</Modal.Footer>
		</>
	);
};

export default TagsDetail;
