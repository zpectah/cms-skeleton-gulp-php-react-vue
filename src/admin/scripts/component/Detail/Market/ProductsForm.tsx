import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Switch } from 'antd';

import { SUBMIT_TIMEOUT } from '../../../constants';
import { useProducts } from '../../../Market/hooks';
import { ProductsItemProps } from '../../../Market/types';
import { Modal, Typography, Form, Section } from '../../ui';
import DetailFooter from '../DetailFooter';
import { string } from '../../../../../libs/js/utils';

interface ProductsDetailFormProps {
	detailData: ProductsItemProps;
	onCancel: Function;
	onSave: (data, response) => void;
	onDelete: Function;
	allowSave: boolean;
	allowDelete: boolean;
}

const ProductsDetailForm: React.FC<ProductsDetailFormProps> = (props) => {
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
	const { updateProducts, createProducts, reloadProducts } = useProducts();

	const submitHandler = (data) => {
		const master = {
			...data,
			name: string.replaceSpaces(data.name),
		};

		if (detailData.is_new) {
			createProducts(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		} else {
			updateProducts(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		}

		setTimeout(() => reloadProducts(), SUBMIT_TIMEOUT);
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<Modal.Header>
				<div className="modal-heading-title">
					{detailData.is_new
						? t('title.create_new') +
						  ' ' +
						  t('model_item.Products').toLowerCase()
						: detailData.name}
				</div>
			</Modal.Header>
			<Modal.Content>
				<Section.Base>
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
			/>
		</form>
	);
};

export default ProductsDetailForm;
