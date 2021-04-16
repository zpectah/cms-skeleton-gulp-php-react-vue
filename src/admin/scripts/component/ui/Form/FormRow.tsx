import React from 'react';
import { Controller } from 'react-hook-form';
import { string } from 'javascript-es6-helpers';
import { Row, Col } from 'antd';
import styled from 'styled-components';

import media from '../../../styles/responsive';

const RowWrapper = styled.div`
	width: 100%;
	margin: 0;
	padding: 0.75rem 0;
`;
const RowLabel = styled.label`
	padding-bottom: 0.5rem;
	font-weight: 600;

	${media.min.md} {
		padding-bottom: 0;
	}
`;
const InputWrapper = styled.div``;
const HelpText = styled.div`
	width: 100%;
	height: auto;
	margin-top: 0.75rem;
	font-size: 0.85rem;
	color: rgba(90, 90, 90, 0.5);
`;

interface ContextProps {
	id: string | null;
	name: string | null;
	value: any;
	onChange: Function;
	onBlur: Function;
	ref: any; // TODO
	invalid: boolean | null;
	isTouched: boolean | null;
	isDirty: boolean | null;
}

const Context = React.createContext<ContextProps>({
	id: null,
	name: null,
	value: null,
	onChange: null,
	onBlur: null,
	ref: null,
	invalid: null,
	isTouched: null,
	isDirty: null,
});

interface FormRowProps {
	name: string;
	control: any;
	rules?: any;
	label?: string;
	id?: string;
	defaultValue?: any;
	helpText?: string;
	long?: boolean;
	required?: boolean;
}

const FormRow: React.FC<FormRowProps> = (props) => {
	const {
		children,
		name,
		control,
		rules,
		label,
		id = string.getToken(2, ''),
		defaultValue,
		helpText,
		long = false,
		required = false,
	} = props;

	const grid = {
		label: label ? 6 : 0,
		input: label ? (long ? 18 : 10) : 24,
	};

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			defaultValue={defaultValue}
			render={(
				{ onChange, onBlur, value, name, ref },
				{ invalid, isTouched, isDirty },
			) => (
				<Context.Provider
					value={{
						id: id,
						name: name,
						value: value,
						onChange: onChange,
						onBlur: onBlur,
						ref: ref,
						invalid: invalid,
						isTouched: isTouched,
						isDirty: isDirty,
					}}
				>
					<RowWrapper>
						<Row>
							{label && (
								<Col span={24} md={grid.label}>
									<RowLabel htmlFor={id}>
										{label} {required && '*'}
									</RowLabel>
								</Col>
							)}
							<Col span={24} md={grid.input + 2} lg={grid.input}>
								<InputWrapper>
									{/* TODO: resolve children function with props */}
									{/* @ts-ignore */}
									<Context.Consumer children={children} />
									{helpText && <HelpText>{helpText}</HelpText>}
								</InputWrapper>
							</Col>
						</Row>
					</RowWrapper>
				</Context.Provider>
			)}
		/>
	);
};

export default FormRow;
