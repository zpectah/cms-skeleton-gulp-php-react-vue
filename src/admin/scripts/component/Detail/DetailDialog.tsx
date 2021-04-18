import React from 'react';

import { appProps } from '../../types';
import { Modal } from '../ui';
import TagsDetail from './model/Tags';
import UsersDetail from './model/Users';
import PostsDetail from './model/Posts';

interface DetailItemDialogProps {
	model: appProps['model'];
	isOpen: boolean;
	onCancel: (event) => void;
	detailData: any;
	onSave: (data) => void;
	onDelete: (data) => void;
	afterClose?: () => void;
}

const DetailDialog: React.FC<DetailItemDialogProps> = (props) => {
	const {
		model,
		isOpen,
		onCancel,
		detailData,
		onSave,
		onDelete,
		afterClose,
	} = props;

	return (
		<Modal.Base
			visible={isOpen}
			onCancel={onCancel}
			afterClose={afterClose}
			size={'lg'}
		>
			<>
				{
					{
						Tags: (
							<TagsDetail
								detailData={detailData}
								onCancel={onCancel}
								onSave={onSave}
								onDelete={onDelete}
							/>
						),
						Users: (
							<UsersDetail
								detailData={detailData}
								onCancel={onCancel}
								onSave={onSave}
								onDelete={onDelete}
							/>
						),
						Posts: (
							<PostsDetail
								detailData={detailData}
								onCancel={onCancel}
								onSave={onSave}
								onDelete={onDelete}
							/>
						),
					}[model]
				}
			</>
		</Modal.Base>
	);
};

export default DetailDialog;
