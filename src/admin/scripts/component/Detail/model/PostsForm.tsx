import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Switch } from 'antd';

import { SUBMIT_TIMEOUT } from '../../../constants';
import { PostsItemProps } from '../../../App/types';
import { Button, Modal, Typography, Form, Section } from '../../ui';
import api from '../../../utils/api';
import LanguageToggle from '../../LanguageToggle';
import CFG from '../../../../../config/global.json';

interface PostsDetailFormProps {
	detailData: PostsItemProps;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
}

const PostsDetailForm: React.FC<PostsDetailFormProps> = (props) => {
	const { detailData, onCancel, onSave, onDelete } = props;
	const { t } = useTranslation(['common']);
	const { control, handleSubmit, setValue, formState, register } = useForm({
		mode: 'onChange',
		defaultValues: detailData,
	});
	const [lang, setLang] = useState(CFG.PROJECT.LANG_DEFAULT);

	// TODO
	const model = detailData;

	const submitHandler = (data) => {
		console.log('On Detail Submit', data);

		const path = detailData.is_new ? '/api/create_posts' : '/api/update_posts';

		api.post(path, data).then((res: any) => {
			console.log('After ... submitHandler');
			console.log('res', res);

			onSave(data);
		});
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
						? t('title.create_new') + ' ' + t('model_item.Posts').toLowerCase()
						: detailData.name}
				</Typography.Title>
			</Modal.Header>
			<Modal.Content>
				<LanguageToggle onChange={(lang) => setLang(lang)} />
				<br />
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
					{/* TODO: ... */}
					<br />
					{'lang' + lang}
				</Section.Base>
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

export default PostsDetailForm;
