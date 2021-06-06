import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Switch } from 'antd';

import { SUBMIT_TIMEOUT } from '../../../constants';
import { useTags } from '../../../App/hooks';
import { TagsItemProps } from '../../../App/types';
import { Modal, Typography, Form, Section } from '../../ui';
import DetailFooter from '../DetailFooter';
import { string } from '../../../../../libs/js/utils';

interface TagsDetailFormProps {
	detailData: TagsItemProps;
	onCancel: Function;
	onSave: (data, response) => void;
	onDelete: Function;
	allowSave: boolean;
	allowDelete: boolean;
}

const TagsDetailForm: React.FC<TagsDetailFormProps> = ({
	detailData,
	onCancel,
	onSave,
	onDelete,
	allowSave,
	allowDelete,
}) => {
	const { t } = useTranslation(['common']);
	const { Tags, updateTags, createTags, reloadTags } = useTags();
	const [duplicates, setDuplicates] = useState(false);
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
			createTags(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		} else {
			updateTags(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		}

		setTimeout(() => reloadTags(), SUBMIT_TIMEOUT);
	};

	const isDuplicate = (name) => {
		let duplicate = false;
		Tags?.map((item) => {
			if (item.name == name) duplicate = true;
		});

		setDuplicates(duplicate);

		return duplicate;
	};

	return (
		<form>
			<Modal.Header>
				<div className="modal-heading-title">
					{detailData.is_new
						? t('title.create_new') + ' ' + t('model_item.Tags').toLowerCase()
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
						errors={duplicates ? ['This name is already in use'] : []}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'text'}
								name={row.name}
								value={row.value}
								onChange={(e) => {
									row.onChange(e.target.value);
									if (e.target.value.length > 2) isDuplicate(e.target.value);
								}}
								placeholder={'Name'}
							/>
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
				invalid={!formState.isValid && !duplicates}
				detailData={detailData}
				allowSave={allowSave}
				allowDelete={allowDelete}
				onSubmit={handleSubmit(submitHandler)}
			/>
		</form>
	);
};

export default TagsDetailForm;
