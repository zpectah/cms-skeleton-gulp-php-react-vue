import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../routes.json';
import { usePosts } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import List from '../../component/List';
import { Button } from '../../component/ui';

const PostsPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const [loading, setLoading] = useState<boolean>(false);
	const { Posts } = usePosts();

	useEffect(() => {
		loadData();

		return () => null;
	}, []);

	const loadData = () => {
		// TODO: handler for load trigger ...
	};

	return (
		<AppLayout
			route={routes.posts}
			app={'App'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Posts.meta.title')}
			headerTitle={t('page:Posts.page.title')}
			headerChildren={[
				<Button.CreateNew key={1} routePathPrefix={routes.posts.pathDetail} />,
			]}
		>
			<List.Items
				route={routes.posts}
				model={'Posts'}
				items={Posts}
				loading={loading}
				columnsLayout={{
					// name: true,
					title: true,
					tags: true,
					category: true,
					active: true,
				}}
				orderByColumns={{
					name: true,
				}}
				detailId={params.id}
				onReload={loadData}
				searchAttrs={['name', 'lang.en.title']}
				selectable
				allowDelete
			/>
		</AppLayout>
	);
};

export default PostsPage;
