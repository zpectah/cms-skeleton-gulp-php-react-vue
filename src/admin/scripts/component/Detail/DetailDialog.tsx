import React from 'react';

import { appProps } from '../../types';
import { Modal } from '../ui';
import TagsDetailForm from './model/TagsForm';
import UsersDetailForm from './model/UsersForm';
import PostsDetailForm from './model/PostsForm';

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
							<TagsDetailForm
								detailData={detailData}
								onCancel={onCancel}
								onSave={onSave}
								onDelete={onDelete}
							/>
						),
						Users: (
							<UsersDetailForm
								detailData={detailData}
								onCancel={onCancel}
								onSave={onSave}
								onDelete={onDelete}
							/>
						),
						Posts: (
							<PostsDetailForm
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
