import React from 'react';
import { Button as Btn, ButtonProps as BtnProps } from 'antd'; // https://ant.design/components/button/
import styled from 'styled-components';

const Wrapper = styled(Btn)``;

interface ButtonProps extends BtnProps {}

const BaseButton: React.FC<ButtonProps> = (props) => {
	const { children } = props;

	return <Wrapper {...props}>{children}</Wrapper>;
};

export default BaseButton;
