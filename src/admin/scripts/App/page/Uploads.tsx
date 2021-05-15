import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT } from '../../constants';
import routes from '../routes.json';
import { useUploads } from '../hooks';
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
			route={routes.uploads}
			app={'App'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Uploads.meta.title')}
			headerTitle={t('page:Uploads.page.title')}
			headerChildren={[
				<Button.CreateNew
					key={1}
					routePathPrefix={routes.uploads.pathDetail}
				/>,
			]}
		>
			<Table
				route={routes.uploads}
				model={'Uploads'}
				items={Uploads}
				loading={isUploadsLoading}
				columnsLayout={{
					// file_name: true,
					title_lang: true,
					// tags: true, // TODO
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

export default UploadsPage;
