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

const MessagesDetailForm: React.FC<MessagesDetailFormProps> = ({
	detailData,
	onCancel,
	onSave,
	onDelete,
	allowSave,
	allowDelete,
}) => {
	const { t } = useTranslation(['common']);
	const { createMessages, reloadMessages } = useMessages();
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});

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
		<form>
			<Modal.Header>
				<div className="modal-heading-title">
					{detailData.is_new
						? t('title.create_new') +
						  ' ' +
						  t('model_item.Messages').toLowerCase()
						: detailData.subject}
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
						<input
							type="hidden"
							name="status"
							ref={register({ required: true })}
							defaultValue={detailData.status || 0}
						/>
					</div>
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
				</Section.Base>
				<Section.Base>
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
				onSubmit={handleSubmit(submitHandler)}
			/>
		</form>
	);
};

export default MessagesDetailForm;
