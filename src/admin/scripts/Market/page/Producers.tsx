import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT } from '../../constants';
import routes from '../../config.routes';
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
			route={routes.market.producers}
			app={'Market'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Producers.meta.title')}
			headerTitle={t('page:Producers.page.title')}
			headerChildren={[
				<Button.CreateNew
					key={1}
					routePathPrefix={routes.market.producers.path}
				/>,
			]}
		>
			<Table
				route={routes.market.producers}
				model={'Producers'}
				items={Producers}
				loading={isProducersLoading}
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

export default ProducersPage;
