import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = (props) => {
	const { children } = props;

	return <Wrapper>{children}</Wrapper>;
};

export default Dashboard;
