import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT, ROUTES } from '../../constants';
import { useDistributors } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const DistributorsPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const {
		Distributors,
		isDistributorsLoading,
		toggleDistributors,
		deleteDistributors,
		reloadDistributors,
	} = useDistributors();

	const toggleHandler = (data) => {
		return [
			toggleDistributors(data),
			setTimeout(() => reloadDistributors(), RELOAD_HOOK_TIMEOUT),
		];
	};

	const deleteHandler = (data) => {
		return [
			deleteDistributors(data),
			setTimeout(() => reloadDistributors(), RELOAD_HOOK_TIMEOUT),
		];
	};

	return (
		<AppLayout
			route={ROUTES.market.distributors}
			app={'Market'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Distributors.meta.title')}
			headerTitle={t('page:Distributors.page.title')}
			headerChildren={[
				<Button.CreateNew
					key={1}
					routePathPrefix={ROUTES.market.distributors.path}
				/>,
			]}
		>
			<Table
				route={ROUTES.market.distributors}
				model={'Distributors'}
				items={Distributors}
				loading={isDistributorsLoading}
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

export default DistributorsPage;
