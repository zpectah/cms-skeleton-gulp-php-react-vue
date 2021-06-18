import React from 'react';

import { appProps } from '../../types';
import { Modal } from '../ui';
import TagsDetailForm from './App/TagsForm';
import UsersDetailForm from './App/UsersForm';
import PostsDetailForm from './App/PostsForm';
import TranslationsDetailForm from './App/TranslationsForm';
import CategoriesDetailForm from './App/CategoriesForm';
import PagesDetailForm from './App/PagesForm';
import UploadsDetailForm from './App/UploadsForm';
import MenuDetailForm from './App/MenuForm';
import MessagesDetailForm from './App/MessagesForm';
import MembersDetailForm from './Members/MembersForm';
import ProductsDetailForm from './Market/ProductsForm';
import DeliveriesDetailForm from './Market/DeliveriesForm';
import DistributorsDetailForm from './Market/DistributorsForm';
import PaymentsDetailForm from './Market/PaymentsForm';
import ProducersDetailForm from './Market/ProducersForm';
import StoresDetailForm from './Market/StoresForm';
import RequestsDetailForm from './App/RequestsForm';
import ProductsOptionsForm from './Market/ProductsOptionsForm';

interface DetailItemDialogProps {
	model:
		| appProps['modelApp']
		| appProps['modelMembers']
		| appProps['modelMarket'];
	isOpen: boolean;
	onCancel: (event) => void;
	detailData: any;
	onSave: (data, response) => void;
	onDelete: (data) => void;
	afterClose?: () => void;
	allowSave: boolean;
	allowDelete: boolean;
	size?: 'lg' | 'xl' | 'xxl';
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
		allowSave,
		allowDelete,
		size = 'xl',
	} = props;

	const component = {
		Tags: TagsDetailForm,
		Users: UsersDetailForm,
		Posts: PostsDetailForm,
		Translations: TranslationsDetailForm,
		Categories: CategoriesDetailForm,
		Pages: PagesDetailForm,
		Uploads: UploadsDetailForm,
		Menu: MenuDetailForm,
		Messages: MessagesDetailForm,
		Requests: RequestsDetailForm,
		Members: MembersDetailForm,
		Products: ProductsDetailForm,
		Deliveries: DeliveriesDetailForm,
		Distributors: DistributorsDetailForm,
		Payments: PaymentsDetailForm,
		Producers: ProducersDetailForm,
		Stores: StoresDetailForm,
		ProductsOptions: ProductsOptionsForm,
	};

	const ComponentName = component[model];

	return (
		<Modal.Base
			visible={isOpen}
			onCancel={onCancel}
			afterClose={afterClose}
			size={size}
			mask
		>
			<ComponentName
				detailData={detailData}
				onCancel={onCancel}
				onSave={onSave}
				onDelete={onDelete}
				allowSave={allowSave}
				allowDelete={allowDelete}
			/>
		</Modal.Base>
	);
};

export default Dialog;
