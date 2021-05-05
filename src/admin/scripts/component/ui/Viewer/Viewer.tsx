import React from 'react';

import TagsList from './model/TagsList';
import CategoriesList from './model/CategoriesList';

interface ViewerProps {
	model: 'Tags' | 'Categories';
	items: any[];
	language?: string;
}

const Viewer: React.FC<ViewerProps> = ({ model, items, language }) => {
	return (
		<>
			{items.length > 0 && (
				<>
					{
						{
							Tags: <TagsList items={items} />,
							Categories: <CategoriesList items={items} language={language} />,
						}[model]
					}
				</>
			)}
		</>
	);
};

export default Viewer;
