import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT } from '../../constants';
import routes from '../routes.json';
import { useCategories } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const CategoriesPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const {
		Categories,
		isCategoriesLoading,
		toggleCategories,
		deleteCategories,
		reloadCategories,
	} = useCategories();

	const toggleHandler = (data) => {
		return [
			toggleCategories(data),
			setTimeout(() => reloadCategories(), RELOAD_HOOK_TIMEOUT),
		];
	};

	const deleteHandler = (data) => {
		return [
			deleteCategories(data),
			setTimeout(() => reloadCategories(), RELOAD_HOOK_TIMEOUT),
		];
	};

	return (
		<AppLayout
			route={routes.categories}
			app={'App'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Categories.meta.title')}
			headerTitle={t('page:Categories.page.title')}
			headerChildren={[
				<Button.CreateNew
					key={1}
					routePathPrefix={routes.categories.pathDetail}
				/>,
			]}
		>
			<Table
				route={routes.categories}
				model={'Categories'}
				items={Categories}
				loading={isCategoriesLoading}
				columnsLayout={{
					title_lang: true,
					// parent: true,
					active: true,
				}}
				orderByColumns={{
					name: true,
				}}
				detailId={params.id}
				searchAttrs={['name', 'lang.[lang].title', 'lang.[lang].perex']}
				onToggle={toggleHandler}
				onDelete={deleteHandler}
				selectable
				allowDelete
				withLanguageToggle
			/>
		</AppLayout>
	);
};

export default CategoriesPage;
