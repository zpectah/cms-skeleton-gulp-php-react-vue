import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT } from '../../constants';
import routes from '../../config.routes';
import { useTags } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const TagsPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const { Tags, isTagsLoading, toggleTags, deleteTags, reloadTags } = useTags();

	const toggleHandler = (data) => {
		return [
			toggleTags(data),
			setTimeout(() => reloadTags(), RELOAD_HOOK_TIMEOUT),
		];
	};

	const deleteHandler = (data) => {
		return [
			deleteTags(data),
			setTimeout(() => reloadTags(), RELOAD_HOOK_TIMEOUT),
		];
	};

	return (
		<AppLayout
			route={routes.app.tags}
			app={'App'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Tags.meta.title')}
			headerTitle={t('page:Tags.page.title')}
			headerChildren={[
				<Button.CreateNew
					key={1}
					routePathPrefix={routes.app.tags.pathDetail}
				/>,
			]}
		>
			<Table
				route={routes.app.tags}
				model={'Tags'}
				items={Tags}
				loading={isTagsLoading}
				columnsLayout={{
					name: true,
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

export default TagsPage;
