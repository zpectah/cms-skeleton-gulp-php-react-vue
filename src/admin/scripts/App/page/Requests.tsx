import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT, ROUTES } from '../../constants';
import { useRequests } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const RequestsPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const {
		Requests,
		isRequestsLoading,
		deleteRequests,
		reloadRequests,
	} = useRequests();

	const deleteHandler = (data) => {
		return [
			deleteRequests(data),
			setTimeout(() => reloadRequests(), RELOAD_HOOK_TIMEOUT),
		];
	};

	return (
		<AppLayout
			route={ROUTES.app.requests}
			app={'App'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Requests.meta.title')}
			headerTitle={t('page:Requests.page.title')}
		>
			<Table
				route={ROUTES.app.requests}
				model={'Requests'}
				items={Requests}
				loading={isRequestsLoading}
				columnsLayout={{
					r_value: true,
					type: true,
					context: true,
				}}
				orderByColumns={{}}
				actionColumn={{
					edit: false,
					toggle: false,
				}}
				detailId={params.id}
				searchAttrs={['context', 'token', 'value']}
				onDelete={deleteHandler}
				selectable
				allowDelete
			/>
		</AppLayout>
	);
};

export default RequestsPage;
