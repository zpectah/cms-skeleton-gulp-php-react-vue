import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../routes.json';
import { useUsers } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import List from '../../component/List';
import { Button } from '../../component/ui';

const UsersPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const [updating, setUpdating] = useState<boolean>(false);
	const { Users } = useUsers();

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
			<List.Items
				route={routes.users}
				model={'Users'}
				items={Users}
				loading={updating}
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
				selectable
				allowDelete
			/>
		</AppLayout>
	);
};

export default UsersPage;
