import React, { useEffect, useState } from 'react';
import { Tag } from 'antd';

import { useCategories } from '../../../../App/hooks';

interface CategoriesListProps {
	items: any[];
	language: string;
}

const CategoriesList: React.FC<CategoriesListProps> = ({ items, language }) => {
	const { Categories } = useCategories();
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	useEffect(() => {
		let na = [];
		if (items && Categories && language) {
			Categories.map((item) => {
				items.map((id) => {
					if (item.id == id) na.push(item.lang[language].title);
				});
			});
		}

		setSelectedItems(na);
	}, [items, Categories, language]);

	return (
		<>
			{selectedItems.map((item) => (
				<Tag key={item}>{item}</Tag>
			))}
		</>
	);
};

export default CategoriesList;
