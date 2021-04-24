import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';

import { useSettings } from '../hooks';
import routes from '../routes.json';
import AppLayout from '../../layout/AppLayout';
import { Form } from '../../component/Settings';
import { Preloader } from '../../component/ui';

const SettingsPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const [updating, setUpdating] = useState<boolean>(false);
	const { Settings, isLoading, updateSettings } = useSettings();

	const updateData = (data) => {
		setUpdating(true);
		return updateSettings(data).then(() => {
			message.success('Changes saved', 2.5);
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
		>
			{Settings ? (
				<Form
					route={routes.settings}
					panelKey={params.panel}
					model={Settings}
					loading={isLoading || updating}
					onUpdate={updateData}
				/>
			) : (
				<Preloader.Block />
			)}
		</AppLayout>
	);
};

export default SettingsPage;
