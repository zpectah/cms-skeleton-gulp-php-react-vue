import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../routes.json';
import { usePosts } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const PostsPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const { Posts, isLoading, togglePosts, deletePosts } = usePosts();

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
			<Table
				route={routes.posts}
				model={'Posts'}
				items={Posts}
				// loading={isLoading}
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
				searchAttrs={['name', 'lang.en.title']}
				onToggle={togglePosts}
				onDelete={deletePosts}
				selectable
				allowDelete
			/>
		</AppLayout>
	);
};

export default PostsPage;
