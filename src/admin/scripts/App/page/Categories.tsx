import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT, ROUTES, USER_LEVEL } from '../../constants';
import { useCategories, useProfile } from '../hooks';
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
	const { Profile } = useProfile();

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
			route={ROUTES.app.categories}
			app={'App'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Categories.meta.title')}
			headerTitle={t('page:Categories.page.title')}
			headerChildren={[
				<Button.CreateNew
					key={1}
					routePathPrefix={ROUTES.app.categories.path}
				/>,
			]}
		>
			<Table
				route={ROUTES.app.categories}
				model={'Categories'}
				items={Categories}
				loading={isCategoriesLoading}
				columnsLayout={{
					title_lang: true,
					type: true,
					active: true,
				}}
				orderByColumns={{
					name: true,
				}}
				detailId={params.id}
				searchAttrs={['name', 'lang.[lang].title', 'lang.[lang].perex']}
				onToggle={toggleHandler}
				onDelete={deleteHandler}
				selectable={Profile.user_level > USER_LEVEL.redactor.id}
				allowDelete={Profile.user_level > USER_LEVEL.redactor.id}
				withLanguageToggle
			/>
		</AppLayout>
	);
};

export default CategoriesPage;
