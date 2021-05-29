import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Switch } from 'antd';

import { SUBMIT_TIMEOUT } from '../../../constants';
import { useMessages } from '../../../App/hooks';
import { MessagesItemProps } from '../../../App/types';
import { Modal, Typography, Form, Section } from '../../ui';
import DetailFooter from '../DetailFooter';

interface MessagesDetailFormProps {
	detailData: MessagesItemProps;
	onCancel: Function;
	onSave: (data, response) => void;
	onDelete: Function;
	allowSave: boolean;
	allowDelete: boolean;
}

const MessagesDetailForm: React.FC<MessagesDetailFormProps> = (props) => {
	const {
		detailData,
		onCancel,
		onSave,
		onDelete,
		allowSave,
		allowDelete,
	} = props;
	const { t } = useTranslation(['common']);
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'onChange',
		defaultValues: {
			...detailData,
		},
	});
	const { createMessages, reloadMessages } = useMessages();

	const submitHandler = (data) => {
		if (detailData.is_new) {
			createMessages(data).then((response) => {
				onSave(data, response);
				onCancel();
			});
		}

		setTimeout(() => reloadMessages(), SUBMIT_TIMEOUT);
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<div>
				<input
					type="hidden"
					name="id"
					ref={register({ required: true })}
					defaultValue={detailData.id}
				/>
				<input
					type="hidden"
					name="status"
					ref={register({ required: true })}
					defaultValue={detailData.status || 0}
				/>
			</div>
			<Modal.Header>
				<Typography.Title level={'h3'} noMargin>
					{detailData.is_new
						? t('title.create_new') +
						  ' ' +
						  t('model_item.Messages').toLowerCase()
						: detailData.subject}
				</Typography.Title>
			</Modal.Header>
			<Modal.Content>
				<Section.Base>
					<div>... from ...</div>
					<div>... to ...</div>
					<Form.Row
						label={'Name'}
						name={'subject'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={''}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'text'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Subject'}
							/>
						)}
					</Form.Row>
					<div>... content ...</div>
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
			/>
		</form>
	);
};

export default MessagesDetailForm;
