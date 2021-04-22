import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { message, Spin } from 'antd';

import api from '../../utils/api';
import routes from '../routes.json';
import AppLayout from '../../layout/AppLayout';
import Settings from '../../component/Settings';
import { loadSettings } from '../../store/App/actions';
import { Button } from '../../component/ui';

interface SettingsPageProps {}

const SettingsPage: React.FC<SettingsPageProps> = (props) => {
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

	const loadData = () => {
		dispatch(loadSettings());
	};
	const updateData = (data) => {
		setLoading(true);

		return api.post('/api/update_settings', data).then(() => {
			message.success('Data was updated', 2.5);
			loadData();
			setLoading(false);
		});
	};

	return (
		<AppLayout
			route={routes.settings}
			app={'App'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Settings.meta.title')}
			headerTitle={t('page:Settings.page.title')}
			headerChildren={[
				<Button.Base
					key={1}
					onClick={loadData}
					type={'primary'}
					loading={state.ui.loadingData}
					ghost
				>
					Reload
				</Button.Base>,
			]}
		>
			{state.app.Settings ? (
				<Settings
					route={routes.settings}
					panelKey={params.panel}
					model={state.app.Settings}
					loading={loading}
					onUpdate={updateData}
				/>
			) : (
				<div>
					<Spin />
				</div>
			)}
		</AppLayout>
	);
};

export default SettingsPage;
