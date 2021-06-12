import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RELOAD_HOOK_TIMEOUT, ROUTES } from '../../constants';
import { usePayments } from '../hooks';
import AppLayout from '../../layout/AppLayout';
import { Table } from '../../component/Table';
import { Button } from '../../component/ui';

const PaymentsPage = () => {
	const { t } = useTranslation('page');
	const params: any = useParams();
	const {
		Payments,
		isPaymentsLoading,
		togglePayments,
		deletePayments,
		reloadPayments,
	} = usePayments();

	const toggleHandler = (data) => {
		return [
			togglePayments(data),
			setTimeout(() => reloadPayments(), RELOAD_HOOK_TIMEOUT),
		];
	};

	const deleteHandler = (data) => {
		return [
			deletePayments(data),
			setTimeout(() => reloadPayments(), RELOAD_HOOK_TIMEOUT),
		];
	};

	return (
		<AppLayout
			route={ROUTES.market.payments}
			app={'Market'}
			withSidebar
			widthHeader
			withFooter
			metaTitle={t('page:Payments.meta.title')}
			headerTitle={t('page:Payments.page.title')}
			headerChildren={[
				<Button.CreateNew
					key={1}
					routePathPrefix={ROUTES.market.payments.path}
				/>,
			]}
		>
			<Table
				route={ROUTES.market.payments}
				model={'Payments'}
				items={Payments}
				loading={isPaymentsLoading}
				columnsLayout={{
					name: true,
					active: true,
				}}
				orderByColumns={{
					name: true,
				}}
				detailId={params.id}
				searchAttrs={['name', 'lang.[lang].title']}
				onToggle={toggleHandler}
				onDelete={deleteHandler}
				selectable
				allowDelete
			/>
		</AppLayout>
	);
};

export default PaymentsPage;
