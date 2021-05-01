import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../routes.json';
import { useTags } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const TagsPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const { Tags, isLoading, toggleTags, deleteTags, reload } = useTags();

	const toggleHandler = (data) => {
		return [toggleTags(data), setTimeout(() => reload(), 250)];
	};

	const deleteHandler = (data) => {
		return [deleteTags(data), setTimeout(() => reload(), 250)];
	};

	return (
		<AppLayout
			route={routes.tags}
			app={'App'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Tags.meta.title')}
			headerTitle={t('page:Tags.page.title')}
			headerChildren={[
				<Button.CreateNew key={1} routePathPrefix={routes.tags.pathDetail} />,
			]}
		>
			<Table
				route={routes.tags}
				model={'Tags'}
				items={Tags}
				// loading={isLoading}
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
