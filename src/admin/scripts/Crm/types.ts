import { commonModelProps } from '../types';

export interface CampaignsItemProps extends commonModelProps {
	name: string;
	type: 'default' | 'market';
	recipients: string[];
	receivers: string[];
	title: string;
	content: string;
	status: number;
}
