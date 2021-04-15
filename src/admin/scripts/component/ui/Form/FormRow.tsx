import React from 'react';
import { Controller } from 'react-hook-form';
import { string } from 'javascript-es6-helpers';
import styled from 'styled-components';

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
	} = props;

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
					<div>
						{label && (
							<div>
								<label htmlFor={id}>{label}</label>
							</div>
						)}
						<div>
							{/* TODO: resolve children function with props */}
							{/* @ts-ignore */}
							<Context.Consumer children={children} />
							{helpText && <>{helpText}</>}
						</div>
					</div>
				</Context.Provider>
			)}
		/>
	);
};

export default FormRow;
