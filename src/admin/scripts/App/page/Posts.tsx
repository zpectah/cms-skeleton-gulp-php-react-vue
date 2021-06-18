import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT, ROUTES, USER_LEVEL } from '../../constants';
import { usePosts, useProfile } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const PostsPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const {
		Posts,
		isPostsLoading,
		togglePosts,
		deletePosts,
		reloadPosts,
	} = usePosts();
	const { Profile } = useProfile();

	const toggleHandler = (data) => {
		return [
			togglePosts(data),
			setTimeout(() => reloadPosts(), RELOAD_HOOK_TIMEOUT),
		];
	};

	const deleteHandler = (data) => {
		return [
			deletePosts(data),
			setTimeout(() => reloadPosts(), RELOAD_HOOK_TIMEOUT),
		];
	};

	return (
		<AppLayout
			route={ROUTES.app.posts}
			app={'App'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Posts.meta.title')}
			headerTitle={t('page:Posts.page.title')}
			headerChildren={[
				<Button.CreateNew key={1} routePathPrefix={ROUTES.app.posts.path} />,
			]}
		>
			<Table
				route={ROUTES.app.posts}
				model={'Posts'}
				items={Posts}
				loading={isPostsLoading}
				columnsLayout={{
					title_lang: true,
					type: true,
					tags: true,
					category: true,
					active: true,
					authorized: true,
				}}
				orderByColumns={{
					name: true,
				}}
				detailId={params.id}
				searchAttrs={['name', 'lang.[lang].title', 'lang.[lang].perex']}
				onToggle={toggleHandler}
				onDelete={deleteHandler}
				selectable={Profile.user_level > USER_LEVEL.redactor.id}
				allowDelete={Profile.user_level > USER_LEVEL.redactor.id}
				withLanguageToggle
				redactorId={Profile.user_level == USER_LEVEL.redactor.id && Profile.id}
			/>
		</AppLayout>
	);
};

export default PostsPage;
