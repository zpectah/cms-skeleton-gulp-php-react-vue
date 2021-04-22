import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import routes from '../routes.json';
import { loadTags } from '../../store/App/actions';
import AppLayout from '../../layout/AppLayout';
import List from '../../component/List';
import { Button } from '../../component/ui';

const TagsPage: React.FC<{}> = (props) => {
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

	const loadData = () => dispatch(loadTags());

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
				items={state.app.Tags}
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
