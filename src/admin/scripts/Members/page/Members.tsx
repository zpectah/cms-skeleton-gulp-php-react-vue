import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT } from '../../constants';
import routes from '../../config.routes';
import { useMembers } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const MembersPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const {
		Members,
		isMembersLoading,
		toggleMembers,
		deleteMembers,
		reloadMembers,
	} = useMembers();

	const toggleHandler = (data) => {
		return [
			toggleMembers(data),
			setTimeout(() => reloadMembers(), RELOAD_HOOK_TIMEOUT),
		];
	};

	const deleteHandler = (data) => {
		return [
			deleteMembers(data),
			setTimeout(() => reloadMembers(), RELOAD_HOOK_TIMEOUT),
		];
	};

	return (
		<AppLayout
			route={routes.members.members}
			app={'Members'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Members.meta.title')}
			headerTitle={t('page:Members.page.title')}
			headerChildren={[
				<Button.CreateNew
					key={1}
					routePathPrefix={routes.members.members.pathDetail}
				/>,
			]}
		>
			<Table
				route={routes.members.members}
				model={'Members'}
				items={Members}
				loading={isMembersLoading}
				columnsLayout={{
					email: true,
					nickname: true,
					member_group: true,
					active: true,
				}}
				orderByColumns={{
					name: true,
					email: true,
				}}
				detailId={params.id}
				searchAttrs={['name', 'nickname', 'email']}
				onToggle={toggleHandler}
				onDelete={deleteHandler}
				selectable
				allowDelete
			/>
		</AppLayout>
	);
};

export default MembersPage;
