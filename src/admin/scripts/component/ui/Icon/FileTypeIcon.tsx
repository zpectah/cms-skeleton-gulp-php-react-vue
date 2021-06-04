import React, { useMemo, useState } from 'react';

import MaterialDesignIcon from '../Icon/MaterialDesignIcon';

interface FileTypeIconProps {
	type: 'image' | 'audio' | 'video' | 'document' | 'archive';
	size?: number;
}

const FileTypeIcon = ({ type, size = 40 }: FileTypeIconProps) => {
	const [iconType, setIconType] = useState<any>(null);

	useMemo(() => {
		switch (type) {
			case 'image':
				setIconType('Image');
				break;
			case 'audio':
				setIconType('Mic');
				break;
			case 'video':
				setIconType('Movie');
				break;
			case 'document':
				setIconType('Description');
				break;
			case 'archive':
				setIconType('Save');
				break;
		}
	}, []);

	return <MaterialDesignIcon type={iconType} size={size} />;
};

export default FileTypeIcon;
