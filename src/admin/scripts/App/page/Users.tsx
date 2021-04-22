import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import routes from '../routes.json';
import { loadUsers } from '../../store/App/actions';
import AppLayout from '../../layout/AppLayout';
import List from '../../component/List';
import { Button } from '../../component/ui';

const UsersPage: React.FC<{}> = (props) => {
	const {} = props;
	const { t } = useTranslation('page');
	const state: any = useSelector((state) => state);
	const dispatch = useDispatch();
	const params: any = useParams();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		loadData();

		return () => null;
	}, []);

	const loadData = () => dispatch(loadUsers());

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
				items={state.app.Users}
				loading={loading}
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
				onReload={loadData}
				searchAttrs={['name', 'nickname', 'email']}
				selectable
				allowDelete
			/>
		</AppLayout>
	);
};

export default UsersPage;
