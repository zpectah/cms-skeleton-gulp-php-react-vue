import React from 'react';

import { appProps } from '../../types';
import { Modal } from '../ui';
import TagsDetailForm from './model/TagsForm';
import UsersDetailForm from './model/UsersForm';
import PostsDetailForm from './model/PostsForm';
import TranslationsDetailForm from './model/TranslationsForm';

interface DetailItemDialogProps {
	model: appProps['model'];
	isOpen: boolean;
	onCancel: (event) => void;
	detailData: any;
	onSave: (data, response) => void;
	onDelete: (data) => void;
	afterClose?: () => void;
}

const Dialog: React.FC<DetailItemDialogProps> = (props) => {
	const {
		model,
		isOpen,
		onCancel,
		detailData,
		onSave,
		onDelete,
		afterClose,
	} = props;

	const Component = {
		Tags: TagsDetailForm,
		Users: UsersDetailForm,
		Posts: PostsDetailForm,
		Translations: TranslationsDetailForm,
	};

	const ComponentName = Component[model];

	return (
		<Modal.Base
			visible={isOpen}
			onCancel={onCancel}
			afterClose={afterClose}
			size={'lg'}
		>
			<ComponentName
				detailData={detailData}
				onCancel={onCancel}
				onSave={onSave}
				onDelete={onDelete}
			/>
		</Modal.Base>
	);
};

export default Dialog;
