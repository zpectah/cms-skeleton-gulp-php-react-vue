import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT, ROUTES } from '../../constants';
import { useProducts } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const ProductsPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const {
		Products,
		isProductsLoading,
		toggleProducts,
		deleteProducts,
		reloadProducts,
	} = useProducts();

	const toggleHandler = (data) => {
		return [
			toggleProducts(data),
			setTimeout(() => reloadProducts(), RELOAD_HOOK_TIMEOUT),
		];
	};

	const deleteHandler = (data) => {
		return [
			deleteProducts(data),
			setTimeout(() => reloadProducts(), RELOAD_HOOK_TIMEOUT),
		];
	};

	return (
		<AppLayout
			route={ROUTES.market.products}
			app={'Market'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Products.meta.title')}
			headerTitle={t('page:Products.page.title')}
			headerChildren={[
				<Button.CreateNew
					key={1}
					routePathPrefix={ROUTES.market.products.path}
				/>,
			]}
		>
			<Table
				route={ROUTES.market.products}
				model={'Products'}
				items={Products}
				loading={isProductsLoading}
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
				withLanguageToggle
			/>
		</AppLayout>
	);
};

export default ProductsPage;
