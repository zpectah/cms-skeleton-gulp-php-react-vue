import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Switch } from 'antd';

import { SUBMIT_TIMEOUT } from '../../../constants';
import { useCampaigns } from '../../../Crm/hooks';
import { CampaignsItemProps } from '../../../Crm/types';
import { Modal, Typography, Form, Section } from '../../ui';
import DetailFooter from '../DetailFooter';

interface CampaignsDetailFormProps {
	detailData: CampaignsItemProps;
	onCancel: Function;
	onSave: (data, response) => void;
	onDelete: Function;
}

const CampaignsDetailForm: React.FC<CampaignsDetailFormProps> = (props) => {
	const { detailData, onCancel, onSave, onDelete } = props;
	const { t } = useTranslation(['common']);
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'onChange',
		defaultValues: {
			name: '',
			active: 1,
			...detailData,
		},
	});
	const { updateCampaigns, createCampaigns, reloadCampaigns } = useCampaigns();

	const submitHandler = (data) => {
		if (detailData.is_new) {
			createCampaigns(data).then((response) => {
				onSave(data, response);
				onCancel();
			});
		} else {
			updateCampaigns(data).then((response) => {
				onSave(data, response);
				onCancel();
			});
		}

		setTimeout(() => reloadCampaigns(), SUBMIT_TIMEOUT);
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<input
				type="hidden"
				name="id"
				ref={register({ required: true })}
				defaultValue={detailData.id}
			/>
			<Modal.Header>
				<Typography.Title level={'h3'} noMargin>
					{detailData.is_new
						? t('title.create_new') +
						  ' ' +
						  t('model_item.Campaigns').toLowerCase()
						: detailData.name}
				</Typography.Title>
			</Modal.Header>
			<Modal.Content>
				<Section.Base>
					<Form.Row
						label={'Name'}
						name={'name'}
						control={control}
						rules={{ required: true }}
						required
					>
						{(row) => (
							<Input
								id={row.id}
								type={'text'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Name'}
							/>
						)}
					</Form.Row>
					<Form.Row label={'Active'} name={'active'} control={control}>
						{(row) => (
							<Switch checked={row.value == 1} onChange={row.onChange} />
						)}
					</Form.Row>
				</Section.Base>
			</Modal.Content>
			<DetailFooter
				onCancel={onCancel}
				onDelete={onDelete}
				isNew={detailData.is_new}
				invalid={!formState.isValid}
				detailData={detailData}
			/>
		</form>
	);
};

export default CampaignsDetailForm;
