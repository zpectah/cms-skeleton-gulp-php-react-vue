import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

import LocaleToggle from './LocaleToggle';

interface FormProps {
	model: any;
}

const Form: React.FC<FormProps> = ({ model }) => {
	return (
		<Wrapper>
			<LocaleToggle />
			<div>...Form...{JSON.stringify(model)}</div>
		</Wrapper>
	);
};

export default Form;
