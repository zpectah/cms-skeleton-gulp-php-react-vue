import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT } from '../../constants';
import routes from '../../config.routes';
import { usePages } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const PagesPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const {
		Pages,
		isPagesLoading,
		togglePages,
		deletePages,
		reloadPages,
	} = usePages();

	const toggleHandler = (data) => {
		return [
			togglePages(data),
			setTimeout(() => reloadPages(), RELOAD_HOOK_TIMEOUT),
		];
	};

	const deleteHandler = (data) => {
		return [
			deletePages(data),
			setTimeout(() => reloadPages(), RELOAD_HOOK_TIMEOUT),
		];
	};

	return (
		<AppLayout
			route={routes.app.pages}
			app={'App'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Pages.meta.title')}
			headerTitle={t('page:Pages.page.title')}
			headerChildren={[
				<Button.CreateNew
					key={1}
					routePathPrefix={routes.app.pages.pathDetail}
				/>,
			]}
		>
			<Table
				route={routes.app.pages}
				model={'Pages'}
				items={Pages}
				loading={isPagesLoading}
				columnsLayout={{
					title_lang: true,
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

export default PagesPage;
