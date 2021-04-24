import React, { useState } from 'react';
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
	const [updating, setUpdating] = useState<boolean>(false);
	const { Tags } = useTags();

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
				loading={updating}
				columnsLayout={{
					name: true,
					active: true,
				}}
				orderByColumns={{
					name: true,
				}}
				detailId={params.id}
				searchAttrs={['name']}
				selectable
				allowDelete
			/>
		</AppLayout>
	);
};

export default TagsPage;
