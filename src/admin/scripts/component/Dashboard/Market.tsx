import React from 'react';
import { Card, Col, Row } from 'antd';
import styled from 'styled-components';

import Dashboard from './Dashboard';

interface MarketDashboardProps {}

const MarketDashboard: React.FC<MarketDashboardProps> = ({}) => {
	return (
		<Dashboard>
			<Row>
				<Col span={8}>
					<Card title="Card A" extra={<a href="#">More</a>}>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
					</Card>
				</Col>
				<Col span={8}>
					<Card title="Card B" extra={<a href="#">More</a>}>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
					</Card>
				</Col>
				<Col span={8}>
					<Card title="Card C" extra={<a href="#">More</a>}>
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
