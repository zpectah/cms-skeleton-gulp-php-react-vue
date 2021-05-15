import React from 'react';
import { Radio } from 'antd';

import CFG from '../../../../config/global.json';
import LOCALES from '../../../../config/locales.json';
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
		let label = LOCALES[lng].label;
		if (langList.length > onBreak) label = lng;

		return label;
	};

	return (
		<>
			{langList.length > 1 && (
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
			)}
		</>
	);
};

export default LanguageToggle;
