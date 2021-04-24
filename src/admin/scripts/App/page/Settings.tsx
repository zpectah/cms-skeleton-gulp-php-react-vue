import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';

import api from '../../utils/api';
import { useSettings } from '../hooks';
import routes from '../routes.json';
import AppLayout from '../../layout/AppLayout';
import SettingsForm from '../../component/Settings';
import { Button, Preloader } from '../../component/ui';

const SettingsPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const [updating, setUpdating] = useState<boolean>(false);
	const { Settings, loading } = useSettings();

	const loadData = () => {
		// TODO: handler for load trigger ...
	};

	const updateData = (data) => {
		setUpdating(true);

		return api.post('/api/update_settings', data).then(() => {
			message.success('Data was updated', 2.5);
			setUpdating(false);
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
					loading={loading}
					ghost
				>
					Reload
				</Button.Base>,
			]}
		>
			{Settings ? (
				<SettingsForm
					route={routes.settings}
					panelKey={params.panel}
					model={Settings}
					loading={loading || updating}
					onUpdate={updateData}
				/>
			) : (
				<Preloader.Block />
			)}
		</AppLayout>
	);
};

export default SettingsPage;
