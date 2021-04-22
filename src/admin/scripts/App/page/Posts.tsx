import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import routes from '../routes.json';
import { loadPosts } from '../../store/App/actions';
import AppLayout from '../../layout/AppLayout';
import List from '../../component/List';
import { Button } from '../../component/ui';

const PostsPage: React.FC<{}> = (props) => {
	const {} = props;
	const { t } = useTranslation('page');
	const state: any = useSelector((state) => state);
	const dispatch = useDispatch();
	const params: any = useParams();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		loadData();

		return () => null;
	}, []);

	const loadData = () => dispatch(loadPosts());

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
				items={state.app.Posts}
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
