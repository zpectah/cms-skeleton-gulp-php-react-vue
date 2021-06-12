import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Select, Switch } from 'antd';

import { SUBMIT_TIMEOUT } from '../../../constants';
import { useProducers } from '../../../Market/hooks';
import { ProducersItemProps } from '../../../Market/types';
import { Modal, Typography, Form, Section } from '../../ui';
import DetailFooter from '../DetailFooter';
import { string } from '../../../../../libs/js/utils';
import config from '../../../config';
import Manager from '../../Manager';

interface ProducersDetailFormProps {
	detailData: ProducersItemProps;
	onCancel: Function;
	onSave: (data, response) => void;
	onDelete: Function;
	allowSave: boolean;
	allowDelete: boolean;
}

const ProducersDetailForm: React.FC<ProducersDetailFormProps> = (props) => {
	const {
		detailData,
		onCancel,
		onSave,
		onDelete,
		allowSave,
		allowDelete,
	} = props;
	const { t } = useTranslation(['common']);
	const { updateProducers, createProducers, reloadProducers } = useProducers();
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});

	const submitHandler = (data) => {
		const master = {
			...data,
			name: string.replaceSpaces(data.name),
		};

		if (detailData.is_new) {
			createProducers(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		} else {
			updateProducers(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		}

		setTimeout(() => reloadProducers(), SUBMIT_TIMEOUT);
	};

	return (
		<form>
			<Modal.Header>
				<div className="modal-heading-title">
					{detailData.is_new
						? t('title.create_new') +
						  ' ' +
						  t('model_item.Producers').toLowerCase()
						: detailData.name}
				</div>
			</Modal.Header>
			<Modal.Content>
				<Section.Base withBorder>
					<div>
						<input
							type="hidden"
							name="id"
							ref={register({ required: true })}
							defaultValue={detailData.id}
						/>
					</div>
					<Form.Row
						label={'Name'}
						name={'name'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={detailData.name || ''}
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
					<Form.Row
						label={'Type'}
						name={'type'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={
							detailData.type || config.OPTIONS.model.Producers.type_default
						}
					>
						{(row) => (
							<Select
								style={{ width: '100%' }}
								id={row.id}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Select type'}
							>
								{config.OPTIONS.model.Producers.type_list.map((item) => (
									<Select.Option value={item} key={item}>
										{t(`types:${item}`)}
									</Select.Option>
								))}
							</Select>
						)}
					</Form.Row>
				</Section.Base>
				<Section.Base withBorder>
					<Form.Row
						label={'Main image'}
						name={'img_main'}
						control={control}
						defaultValue={detailData.img_main || ''}
					>
						{(row) => (
							<>
								<Manager.Uploads
									type="image"
									selected={row.value}
									onChange={(value) => row.onChange(value)}
									single
								/>
							</>
						)}
					</Form.Row>
				</Section.Base>
				<Section.Base>
					<Form.Row
						label={'Active'}
						name={'active'}
						control={control}
						defaultValue={detailData.active || true}
					>
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
				allowSave={allowSave}
				allowDelete={allowDelete}
				onSubmit={handleSubmit(submitHandler)}
			/>
		</form>
	);
};

export default ProducersDetailForm;
