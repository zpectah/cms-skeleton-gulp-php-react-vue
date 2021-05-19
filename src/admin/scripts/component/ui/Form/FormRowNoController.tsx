import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';

import { string } from '../../../../../libs/js/utils';
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
}

const Context = React.createContext<ContextProps>({
	id: null,
});

interface FormRowNoControllerProps {
	label?: string;
	id?: string;
	helpText?: string;
	long?: boolean;
	required?: boolean;
}

const FormRowNoController: React.FC<FormRowNoControllerProps> = (props) => {
	const {
		children,
		label,
		id = string.getToken(2, ''),
		helpText,
		long = false,
		required = false,
	} = props;

	const grid = {
		label: label ? 6 : 0,
		input: label ? (long ? 18 : 10) : 24,
	};

	return (
		<>
			<div>
				<Context.Provider
					value={{
						id: id,
					}}
				>
					<RowWrapper>
						<Row>
							{label && (
								<Col span={24} md={grid.label}>
									{label && (
										<RowLabel htmlFor={id}>
											{label} {required && '*'}
										</RowLabel>
									)}
								</Col>
							)}
							<Col span={24} md={grid.input} lg={grid.input}>
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
			</div>
		</>
	);
};

export default FormRowNoController;
