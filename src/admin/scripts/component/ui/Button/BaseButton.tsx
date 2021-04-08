import React from 'react';
import { Button as Btn } from 'antd'; // https://ant.design/components/button/
import styled from 'styled-components';

const Wrapper = styled(Btn)``;

interface ButtonProps {
	block?: boolean;
	danger?: boolean;
	disabled?: boolean;
	ghost?: boolean;
	href?: string;
	htmlType?: 'button' | 'submit' | 'reset';
	icon?: React.ReactNode;
	loading?: boolean | { delay: number };
	shape?: 'circle' | 'round';
	size?: 'large' | 'middle' | 'small';
	target?: string;
	type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
	onClick?: (event) => void;
	style?: any; // TODO
	title?: string;
	className?: string;
}

const BaseButton: React.FC<ButtonProps> = (props) => {
	const { children } = props;

	return <Wrapper {...props}>{children}</Wrapper>;
};

export default BaseButton;
