import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT, ROUTES, USER_LEVEL } from '../../constants';
import { useTags, useProfile } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const TagsPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const { Tags, isTagsLoading, toggleTags, deleteTags, reloadTags } = useTags();
	const { Profile } = useProfile();

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
			route={ROUTES.app.tags}
			app={'App'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Tags.meta.title')}
			headerTitle={t('page:Tags.page.title')}
			headerChildren={[
				<Button.CreateNew key={1} routePathPrefix={ROUTES.app.tags.path} />,
			]}
		>
			<Table
				route={ROUTES.app.tags}
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
				selectable={Profile.user_level > USER_LEVEL.redactor.id}
				allowDelete={Profile.user_level > USER_LEVEL.redactor.id}
			/>
		</AppLayout>
	);
};

export default TagsPage;
