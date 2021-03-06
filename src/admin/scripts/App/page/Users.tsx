import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT, ROUTES } from '../../constants';
import { useUsers } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const UsersPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const {
		Users,
		isUsersLoading,
		toggleUsers,
		deleteUsers,
		reloadUsers,
	} = useUsers();

	const toggleHandler = (data) => {
		return [
			toggleUsers(data),
			setTimeout(() => reloadUsers(), RELOAD_HOOK_TIMEOUT),
		];
	};

	const deleteHandler = (data) => {
		return [
			deleteUsers(data),
			setTimeout(() => reloadUsers(), RELOAD_HOOK_TIMEOUT),
		];
	};

	return (
		<AppLayout
			route={ROUTES.app.users}
			app={'App'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Users.meta.title')}
			headerTitle={t('page:Users.page.title')}
			headerChildren={[
				<Button.CreateNew key={1} routePathPrefix={ROUTES.app.users.path} />,
			]}
		>
			<Table
				route={ROUTES.app.users}
				model={'Users'}
				items={Users}
				loading={isUsersLoading}
				columnsLayout={{
					email: true,
					nickname: true,
					level: true,
					user_group: true,
					active: true,
				}}
				orderByColumns={{
					name: true,
					email: true,
				}}
				detailId={params.id}
				searchAttrs={['name', 'nickname', 'email']}
				onToggle={toggleHandler}
				onDelete={deleteHandler}
				selectable
				allowDelete
			/>
		</AppLayout>
	);
};

export default UsersPage;
