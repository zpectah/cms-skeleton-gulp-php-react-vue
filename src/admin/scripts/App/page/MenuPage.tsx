import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT } from '../../constants';
import routes from '../../config.routes';
import { useMenu } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const MenuPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const { Menu, isMenuLoading, toggleMenu, deleteMenu, reloadMenu } = useMenu();

	const toggleHandler = (data) => {
		return [
			toggleMenu(data),
			setTimeout(() => reloadMenu(), RELOAD_HOOK_TIMEOUT),
		];
	};

	const deleteHandler = (data) => {
		return [
			deleteMenu(data),
			setTimeout(() => reloadMenu(), RELOAD_HOOK_TIMEOUT),
		];
	};

	return (
		<AppLayout
			route={routes.app.menu}
			app={'App'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Menu.meta.title')}
			headerTitle={t('page:Menu.page.title')}
			headerChildren={[
				<Button.CreateNew
					key={1}
					routePathPrefix={routes.app.menu.pathDetail}
				/>,
			]}
		>
			<Table
				route={routes.app.menu}
				model={'Menu'}
				items={Menu}
				loading={isMenuLoading}
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

export default MenuPage;
