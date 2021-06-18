import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT, ROUTES, USER_LEVEL } from '../../constants';
import { useUploads, useProfile } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const UploadsPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const {
		Uploads,
		isUploadsLoading,
		toggleUploads,
		deleteUploads,
		reloadUploads,
	} = useUploads();
	const { Profile } = useProfile();

	const toggleHandler = (data) => {
		return [
			toggleUploads(data),
			setTimeout(() => reloadUploads(), RELOAD_HOOK_TIMEOUT),
		];
	};

	const deleteHandler = (data) => {
		return [
			deleteUploads(data),
			setTimeout(() => reloadUploads(), RELOAD_HOOK_TIMEOUT),
		];
	};

	return (
		<AppLayout
			route={ROUTES.app.uploads}
			app={'App'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Uploads.meta.title')}
			headerTitle={t('page:Uploads.page.title')}
			headerChildren={[
				<Button.CreateNew key={1} routePathPrefix={ROUTES.app.uploads.path} />,
			]}
		>
			<Table
				route={ROUTES.app.uploads}
				model={'Uploads'}
				items={Uploads}
				loading={isUploadsLoading}
				columnsLayout={{
					file_name: true,
					category: true,
					active: true,
					type: true,
					file_size: true,
				}}
				orderByColumns={{
					name: true,
				}}
				detailId={params.id}
				searchAttrs={['name', 'file_name', 'lang.[lang].title']}
				onToggle={toggleHandler}
				onDelete={deleteHandler}
				selectable={Profile.user_level > USER_LEVEL.redactor.id}
				allowDelete={Profile.user_level > USER_LEVEL.redactor.id}
				withLanguageToggle
			/>
		</AppLayout>
	);
};

export default UploadsPage;
