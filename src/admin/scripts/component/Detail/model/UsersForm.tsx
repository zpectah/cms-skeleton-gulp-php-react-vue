import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Switch } from 'antd';

import { Button, Modal, Typography, Form, Section } from '../../ui';

interface UsersDetailFormProps {
	detailData: any;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
}

const UsersDetailForm: React.FC<UsersDetailFormProps> = (props) => {
	const { detailData, onCancel, onSave, onDelete } = props;
	const { t } = useTranslation(['common']);
	const { control, handleSubmit, setValue, formState } = useForm({
		mode: 'onChange',
		defaultValues: detailData,
	});

	// TODO
	const model = detailData;

	useEffect(() => {
		if (detailData) {
			Object.entries(detailData).forEach(([key, value]) => {
				setValue(key, value);
				console.log(key, value);
			});
		}
	}, [detailData]);

	const submitHandler = (data) => {
		console.log('On Detail Submit', data);
		onSave(data);
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<Modal.Header>
				<Typography.Title level={'h3'} noMargin>
					{detailData.is_new
						? t('title.create_new') + ' ' + t('model_item.Users').toLowerCase()
						: detailData.name}
				</Typography.Title>
			</Modal.Header>
			<Modal.Content>
				<Section>
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
						{(row) => <Switch checked={row.value} onChange={row.onChange} />}
					</Form.Row>
					{/* TODO: ... */}
				</Section>
			</Modal.Content>
			<Modal.Footer>
				<Button.Base onClick={() => onCancel()}>{t('btn.close')}</Button.Base>
				{!detailData.is_new && (
					<>
						<Button.Base type="primary" onClick={() => onDelete(model)} danger>
							{t('btn.delete')}
						</Button.Base>
					</>
				)}
				<Button.Base
					type="primary"
					htmlType="submit"
					disabled={!formState.isValid}
				>
					{detailData.is_new ? t('btn.create') : t('btn.save')}
				</Button.Base>
			</Modal.Footer>
		</form>
	);
};

export default UsersDetailForm;