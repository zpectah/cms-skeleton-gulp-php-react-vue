import React from 'react';
import { Card, Col, Row } from 'antd';
import styled from 'styled-components';

import Dashboard from './Dashboard';

interface MarketDashboardProps {}

const MarketDashboard: React.FC<MarketDashboardProps> = ({}) => {
	return (
		<Dashboard>
			{/* content */}
			<Row>
				<Col>
					<Card title="Main dashboard card" extra={<a href="#">More</a>}>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
					</Card>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={8}>
					<Card title="App Card" extra={<a href="#">More</a>}>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
					</Card>
				</Col>
				<Col span={8}>
					<Card title="CRM Card" bordered={false}>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
					</Card>
				</Col>
				<Col span={8}>
					<Card title="Market Card" bordered={false}>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
					</Card>
				</Col>
			</Row>
		</Dashboard>
	);
};

export default MarketDashboard;
