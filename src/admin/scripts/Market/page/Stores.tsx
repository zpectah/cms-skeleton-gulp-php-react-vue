import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT, ROUTES } from '../../constants';
import { useStores } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const StoresPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const {
		Stores,
		isStoresLoading,
		toggleStores,
		deleteStores,
		reloadStores,
	} = useStores();

	const toggleHandler = (data) => {
		return [
			toggleStores(data),
			setTimeout(() => reloadStores(), RELOAD_HOOK_TIMEOUT),
		];
	};

	const deleteHandler = (data) => {
		return [
			deleteStores(data),
			setTimeout(() => reloadStores(), RELOAD_HOOK_TIMEOUT),
		];
	};

	return (
		<AppLayout
			route={ROUTES.market.stores}
			app={'Market'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Stores.meta.title')}
			headerTitle={t('page:Stores.page.title')}
			headerChildren={[
				<Button.CreateNew
					key={1}
					routePathPrefix={ROUTES.market.stores.path}
				/>,
			]}
		>
			<Table
				route={ROUTES.market.stores}
				model={'Stores'}
				items={Stores}
				loading={isStoresLoading}
				columnsLayout={{
					title_lang: true,
					type: true,
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
				withLanguageToggle
			/>
		</AppLayout>
	);
};

export default StoresPage;
