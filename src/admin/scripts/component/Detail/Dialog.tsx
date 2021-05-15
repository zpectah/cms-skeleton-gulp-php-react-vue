import React from 'react';

import { appProps } from '../../types';
import { Modal } from '../ui';
import TagsDetailForm from './App/TagsForm';
import UsersDetailForm from './App/UsersForm';
import PostsDetailForm from './App/PostsForm';
import TranslationsDetailForm from './App/TranslationsForm';
import CategoriesDetailForm from './App/CategoriesForm';

interface DetailItemDialogProps {
	model:
		| appProps['modelApp']
		| appProps['modelMembers']
		| appProps['modelCrm']
		| appProps['modelMarket'];
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
		Categories: CategoriesDetailForm,
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
