import React from 'react';
import { Card, Col, Row } from 'antd';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = (props) => {
	return (
		<div>
			<Row gutter={16}>
				<Col span={8}>
					<Card title="Default size card" extra={<a href="#">More</a>}>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
					</Card>
				</Col>
				<Col span={8}>
					<Card title="Card title" bordered={false}>
						Card content
					</Card>
				</Col>
				<Col span={8}>
					<Card title="Card title" bordered={false}>
						Card content
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Dashboard;
