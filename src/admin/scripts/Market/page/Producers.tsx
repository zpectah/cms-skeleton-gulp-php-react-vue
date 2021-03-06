import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT, ROUTES } from '../../constants';
import { useProducers } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const ProducersPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const {
		Producers,
		isProducersLoading,
		toggleProducers,
		deleteProducers,
		reloadProducers,
	} = useProducers();

	const toggleHandler = (data) => {
		return [
			toggleProducers(data),
			setTimeout(() => reloadProducers(), RELOAD_HOOK_TIMEOUT),
		];
	};

	const deleteHandler = (data) => {
		return [
			deleteProducers(data),
			setTimeout(() => reloadProducers(), RELOAD_HOOK_TIMEOUT),
		];
	};

	return (
		<AppLayout
			route={ROUTES.market.producers}
			app={'Market'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Producers.meta.title')}
			headerTitle={t('page:Producers.page.title')}
			headerChildren={[
				<Button.CreateNew
					key={1}
					routePathPrefix={ROUTES.market.producers.path}
				/>,
			]}
		>
			<Table
				route={ROUTES.market.producers}
				model={'Producers'}
				items={Producers}
				loading={isProducersLoading}
				columnsLayout={{
					name: true,
					type: true,
					active: true,
				}}
				orderByColumns={{
					name: true,
				}}
				detailId={params.id}
				searchAttrs={['name']}
				onToggle={toggleHandler}
				onDelete={deleteHandler}
				selectable
				allowDelete
			/>
		</AppLayout>
	);
};

export default ProducersPage;
