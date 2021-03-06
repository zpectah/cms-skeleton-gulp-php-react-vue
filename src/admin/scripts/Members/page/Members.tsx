import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT, ROUTES } from '../../constants';
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
			route={ROUTES.members.members}
			app={'Members'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Members.meta.title')}
			headerTitle={t('page:Members.page.title')}
			headerChildren={[
				<Button.CreateNew
					key={1}
					routePathPrefix={ROUTES.members.members.path}
				/>,
			]}
		>
			<Table
				route={ROUTES.members.members}
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
