import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT } from '../../constants';
import routes from '../../config.routes';
import { useMessages } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const MessagesPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const {
		Messages,
		isMessagesLoading,
		deleteMessages,
		reloadMessages,
	} = useMessages();

	const toggleHandler = (data) => {
		return () => {};
	};

	const deleteHandler = (data) => {
		return [
			deleteMessages(data),
			setTimeout(() => reloadMessages(), RELOAD_HOOK_TIMEOUT),
		];
	};

	return (
		<AppLayout
			route={routes.app.messages}
			app={'App'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Messages.meta.title')}
			headerTitle={t('page:Messages.page.title')}
			headerChildren={[
				<Button.CreateNew key={1} routePathPrefix={routes.app.messages.path} />,
			]}
		>
			<Table
				route={routes.app.messages}
				model={'Messages'}
				items={Messages}
				loading={isMessagesLoading}
				columnsLayout={{
					sender: true,
				}}
				orderByColumns={{
					sender: true,
				}}
				actionColumn={{
					edit: false,
					toggle: false,
				}}
				detailId={params.id}
				searchAttrs={['sender', 'recipients', 'subject', 'content']}
				onToggle={toggleHandler}
				onDelete={deleteHandler}
				selectable
				allowDelete
			/>
		</AppLayout>
	);
};

export default MessagesPage;
