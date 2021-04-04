import React from 'react';
import { useHistory } from 'react-router-dom';
import { Tabs } from 'antd';

interface SettingsProps {
	route: any; // TODO
	panelKey?: string;
}

const Settings: React.FC<SettingsProps> = (props) => {
	const history = useHistory();
	const { route, panelKey } = props;
	const { TabPane } = Tabs;

	return (
		<Tabs
			defaultActiveKey={panelKey ? panelKey : 'global'}
			onChange={(activeKey) => {
				// console.log('onChange panel...', activeKey);
				history.push(`${route.path}/${activeKey}`);
			}}
		>
			<TabPane tab="Global" key="global">
				<div>
					<Tabs defaultActiveKey="1">
						<TabPane tab="Company" key="1">
							Content of Tab Pane 1
						</TabPane>
						<TabPane tab="Tab 2" key="2">
							Content of Tab Pane 2
						</TabPane>
						<TabPane tab="Tab 3" key="3">
							Content of Tab Pane 3
						</TabPane>
					</Tabs>
				</div>
			</TabPane>
			<TabPane tab="Web" key="web">
				<div>Content of Tab Web</div>
			</TabPane>
			<TabPane tab="Admin" key="admin">
				<div>Content of Tab Admin</div>
			</TabPane>
			<TabPane tab="Module" key="module">
				<div>Content of Tab Module</div>
			</TabPane>
		</Tabs>
	);
};

export default Settings;
