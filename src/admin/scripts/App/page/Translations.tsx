import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT } from '../../constants';
import routes from '../../config.routes';
import { useTranslations } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const TranslationsPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const {
		Translations,
		isTranslationsLoading,
		toggleTranslations,
		deleteTranslations,
		reloadTranslations,
	} = useTranslations();

	const toggleHandler = (data) => {
		return [
			toggleTranslations(data),
			setTimeout(() => reloadTranslations(), RELOAD_HOOK_TIMEOUT),
		];
	};

	const deleteHandler = (data) => {
		return [
			deleteTranslations(data),
			setTimeout(() => reloadTranslations(), RELOAD_HOOK_TIMEOUT),
		];
	};

	return (
		<AppLayout
			route={routes.app.translations}
			app={'App'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Translations.meta.title')}
			headerTitle={t('page:Translations.page.title')}
			headerChildren={[
				<Button.CreateNew
					key={1}
					routePathPrefix={routes.app.translations.path}
				/>,
			]}
		>
			<Table
				route={routes.app.translations}
				model={'Translations'}
				items={Translations}
				loading={isTranslationsLoading}
				columnsLayout={{
					name: true,
					active: true,
				}}
				orderByColumns={{
					name: true,
				}}
				detailId={params.id}
				searchAttrs={['name', 'lang.[lang].t_value']}
				onToggle={toggleHandler}
				onDelete={deleteHandler}
				selectable
				allowDelete
				withLanguageToggle
			/>
		</AppLayout>
	);
};

export default TranslationsPage;
