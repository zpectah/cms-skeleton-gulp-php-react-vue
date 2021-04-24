import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../routes.json';
import { useTags } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import List from '../../component/List';
import { Button } from '../../component/ui';

const TagsPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const [loading, setLoading] = useState<boolean>(false);
	const { Tags } = useTags();

	useEffect(() => {
		loadData();

		return () => null;
	}, []);

	const loadData = () => {
		// TODO: handler for load trigger ...
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
			<List.Items
				route={routes.tags}
				model={'Tags'}
				// items={state.app.Tags}
				items={Tags}
				loading={loading}
				columnsLayout={{
					name: true,
					active: true,
				}}
				orderByColumns={{
					name: true,
				}}
				detailId={params.id}
				onReload={loadData}
				searchAttrs={['name']}
				selectable
				allowDelete
			/>
		</AppLayout>
	);
};

export default TagsPage;
