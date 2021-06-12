import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT, ROUTES } from '../../constants';
import { useDeliveries } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const DeliveriesPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const {
		Deliveries,
		isDeliveriesLoading,
		toggleDeliveries,
		deleteDeliveries,
		reloadDeliveries,
	} = useDeliveries();

	const toggleHandler = (data) => {
		return [
			toggleDeliveries(data),
			setTimeout(() => reloadDeliveries(), RELOAD_HOOK_TIMEOUT),
		];
	};

	const deleteHandler = (data) => {
		return [
			deleteDeliveries(data),
			setTimeout(() => reloadDeliveries(), RELOAD_HOOK_TIMEOUT),
		];
	};

	return (
		<AppLayout
			route={ROUTES.market.deliveries}
			app={'Market'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Deliveries.meta.title')}
			headerTitle={t('page:Deliveries.page.title')}
			headerChildren={[
				<Button.CreateNew
					key={1}
					routePathPrefix={ROUTES.market.deliveries.path}
				/>,
			]}
		>
			<Table
				route={ROUTES.market.deliveries}
				model={'Deliveries'}
				items={Deliveries}
				loading={isDeliveriesLoading}
				columnsLayout={{
					name: true,
					active: true,
				}}
				orderByColumns={{
					name: true,
				}}
				detailId={params.id}
				searchAttrs={['name', 'lang.[lang].title']}
				onToggle={toggleHandler}
				onDelete={deleteHandler}
				selectable
				allowDelete
			/>
		</AppLayout>
	);
};

export default DeliveriesPage;
