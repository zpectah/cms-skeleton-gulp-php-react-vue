import React from 'react';
import { Controller } from 'react-hook-form';
import { string } from 'javascript-es6-helpers';

const Context = React.createContext({
	id: null,
	name: null,
	value: null,
	onChange: null,
});

interface FormRowProps {
	name: string;
	control: any; // TODO
	rules?: any; // TODO
	label?: string;
	id?: string;
}

const FormRow: React.FC<FormRowProps> = (props) => {
	const {
		children,
		name,
		control,
		rules = {},
		label,
		id = string.getToken(2, ''),
	} = props;

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ name, value, onChange }) => (
				<Context.Provider
					value={{ id: id, name: name, value: value, onChange: onChange }}
				>
					<div>
						{label && (
							<div>
								<label htmlFor={id}>{label}</label>
							</div>
						)}
						<div>
							{/* @ts-ignore */}
							<Context.Consumer children={children} />
							{/* TODO: resolve children props */}
						</div>
					</div>
				</Context.Provider>
			)}
		/>
	);
};

export default FormRow;
