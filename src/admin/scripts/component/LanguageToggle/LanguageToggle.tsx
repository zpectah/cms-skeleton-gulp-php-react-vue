import React from 'react';
import { Radio } from 'antd';

import CFG from '../../../../config/global.json';
import NUMS from '../../../../config/nums.json';
import { useSettings } from '../../App/hooks';

interface LanguageToggleProps {
	lang?: string;
	onChange: (lang) => void;
	onBreak?: number;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
	lang,
	onChange,
	onBreak = 3,
}) => {
	const { Settings } = useSettings();
	const langDefault =
		lang || Settings?.language_default || CFG.PROJECT.LANG_DEFAULT;
	const langList = Settings?.language_installed || [];

	const getLabel = (lng) => {
		let label = NUMS.languageTitle[lng];
		if (langList.length > onBreak) label = lng;

		return label;
	};

	return (
		<Radio.Group
			onChange={(e) => onChange(e.target.value)}
			defaultValue={langDefault}
		>
			{langList.map((lng) => (
				<Radio.Button key={lng} value={lng}>
					{getLabel(lng)}
				</Radio.Button>
			))}
		</Radio.Group>
	);
};

export default LanguageToggle;
