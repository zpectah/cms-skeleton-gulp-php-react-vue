import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../routes.json';
import { useUsers } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const UsersPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const { Users, isLoading, toggleUsers, deleteUsers, reload } = useUsers();

	const toggleHandler = (data) => {
		return [toggleUsers(data), setTimeout(() => reload(), 250)];
	};

	const deleteHandler = (data) => {
		return [deleteUsers(data), setTimeout(() => reload(), 250)];
	};

	return (
		<AppLayout
			route={routes.users}
			app={'App'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Users.meta.title')}
			headerTitle={t('page:Users.page.title')}
			headerChildren={[
				<Button.CreateNew key={1} routePathPrefix={routes.users.pathDetail} />,
			]}
		>
			<Table
				route={routes.users}
				model={'Users'}
				items={Users}
				// loading={isLoading}
				columnsLayout={{
					email: true,
					nickname: true,
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
