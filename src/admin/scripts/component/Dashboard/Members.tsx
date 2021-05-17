import React from 'react';
import { Card, Col, Row } from 'antd';
import styled from 'styled-components';

import Dashboard from './Dashboard';

interface MembersDashboardProps {}

const MembersDashboard: React.FC<MembersDashboardProps> = ({}) => {
	return (
		<Dashboard>
			<Row>
				<Col span={12}>
					<Card title="Card A" extra={<a href="#">More</a>}>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
					</Card>
				</Col>
				<Col span={12}>
					<Card title="Card B" extra={<a href="#">More</a>}>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
					</Card>
				</Col>
			</Row>
		</Dashboard>
	);
};

export default MembersDashboard;
