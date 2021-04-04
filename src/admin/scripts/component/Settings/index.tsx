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
					Project & paths
					<br />
					Company
					<br />
					Contacts ...
				</div>
			</TabPane>
			<TabPane tab="Web" key="web">
				<div>
					Members login
					<br />
					Paths to pages (override system default pages...)
					<br />
					Other settings...
				</div>
			</TabPane>
			<TabPane tab="Admin" key="admin">
				<div>
					User options settings
					<br />
					Administrator contact...
				</div>
			</TabPane>
			<TabPane tab="Module" key="module">
				<div>
					Crm module settings
					<br />
					Market module settings
				</div>
			</TabPane>
		</Tabs>
	);
};

export default Settings;
