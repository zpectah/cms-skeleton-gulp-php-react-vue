import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Modal, Typography } from '../../ui';
import { useForm } from 'react-hook-form';

interface PostsDetailFormProps {
	detailData: any;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
}

const PostsDetailForm: React.FC<PostsDetailFormProps> = (props) => {
	const { detailData, onCancel, onSave, onDelete } = props;
	const { t } = useTranslation(['common']);
	const { control, handleSubmit, setValue } = useForm({
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
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<Modal.Header>
				<Typography.Title level={'h3'} noMargin>
					{detailData.name}
				</Typography.Title>
			</Modal.Header>
			<Modal.Content>PostDetail ... {JSON.stringify(detailData)}</Modal.Content>
			<Modal.Footer>
				<Button.Base onClick={() => onCancel()}>{t('btn_close')}</Button.Base>
				{detailData && detailData.id !== 'new' && (
					<>
						<Button.Base type="primary" onClick={() => onDelete(model)} danger>
							{t('btn_delete')}
						</Button.Base>
					</>
				)}
				<Button.Base type="primary" onClick={() => onSave(model)}>
					{t('btn_save')}
				</Button.Base>
			</Modal.Footer>
		</form>
	);
};

export default PostsDetailForm;
