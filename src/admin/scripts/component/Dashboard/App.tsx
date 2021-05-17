import React from 'react';
import { Card, Col, Row } from 'antd';
import styled from 'styled-components';

import Dashboard from './Dashboard';

interface AppDashboardProps {}

const AppDashboard: React.FC<AppDashboardProps> = ({}) => {
	return (
		<Dashboard>
			<Row>
				<Col span={16}>
					<Card title="Main dashboard card" extra={<a href="#">More</a>}>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
					</Card>
				</Col>
				<Col span={8}>
					<Card title="Card A" extra={<a href="#">More</a>}>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col span={8}>
					<Card title="Members Card" extra={<a href="#">More</a>}>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
					</Card>
				</Col>
				<Col span={8}>
					<Card title="CRM Card" extra={<a href="#">More</a>}>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
					</Card>
				</Col>
				<Col span={8}>
					<Card title="Market Card" extra={<a href="#">More</a>}>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
					</Card>
				</Col>
			</Row>
		</Dashboard>
	);
};

export default AppDashboard;
