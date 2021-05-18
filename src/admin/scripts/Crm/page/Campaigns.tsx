import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT } from '../../constants';
import routes from '../routes.json';
import { useCampaigns } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const CampaignsPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const {
		Campaigns,
		isCampaignsLoading,
		toggleCampaigns,
		deleteCampaigns,
		reloadCampaigns,
	} = useCampaigns();

	const toggleHandler = (data) => {
		return [
			toggleCampaigns(data),
			setTimeout(() => reloadCampaigns(), RELOAD_HOOK_TIMEOUT),
		];
	};

	const deleteHandler = (data) => {
		return [
			deleteCampaigns(data),
			setTimeout(() => reloadCampaigns(), RELOAD_HOOK_TIMEOUT),
		];
	};

	return (
		<AppLayout
			route={routes.campaigns}
			app={'Crm'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Campaigns.meta.title')}
			headerTitle={t('page:Campaigns.page.title')}
			headerChildren={[
				<Button.CreateNew
					key={1}
					routePathPrefix={routes.campaigns.pathDetail}
				/>,
			]}
		>
			<Table
				route={routes.campaigns}
				model={'Campaigns'}
				items={Campaigns}
				loading={isCampaignsLoading}
				columnsLayout={{
					name: true,
					active: true,
				}}
				orderByColumns={{
					name: true,
				}}
				detailId={params.id}
				searchAttrs={['name', 'title']}
				onToggle={toggleHandler}
				onDelete={deleteHandler}
				selectable
				allowDelete
			/>
		</AppLayout>
	);
};

export default CampaignsPage;
