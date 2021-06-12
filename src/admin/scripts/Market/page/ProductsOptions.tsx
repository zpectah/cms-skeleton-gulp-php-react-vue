import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT, ROUTES } from '../../constants';
import { useProductsOptions } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const ProductsOptionsPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const {
		ProductsOptions,
		isProductsOptionsLoading,
		toggleProductsOptions,
		deleteProductsOptions,
		reloadProductsOptions,
	} = useProductsOptions();

	const toggleHandler = (data) => {
		return [
			toggleProductsOptions(data),
			setTimeout(() => reloadProductsOptions(), RELOAD_HOOK_TIMEOUT),
		];
	};

	const deleteHandler = (data) => {
		return [
			deleteProductsOptions(data),
			setTimeout(() => reloadProductsOptions(), RELOAD_HOOK_TIMEOUT),
		];
	};

	return (
		<AppLayout
			route={ROUTES.market['products-options']}
			app={'Market'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:ProductsOptions.meta.title')}
			headerTitle={t('page:ProductsOptions.page.title')}
			headerChildren={[
				<Button.CreateNew
					key={1}
					routePathPrefix={ROUTES.market['products-options'].path}
				/>,
			]}
		>
			<Table
				route={ROUTES.market['products-options']}
				model={'ProductsOptions'}
				items={ProductsOptions}
				loading={isProductsOptionsLoading}
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

export default ProductsOptionsPage;
