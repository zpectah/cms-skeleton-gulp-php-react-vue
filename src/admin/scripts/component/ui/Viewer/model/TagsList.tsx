import React, { useEffect, useState } from 'react';
import { Tag } from 'antd';

import { useTags } from '../../../../App/hooks';

interface TagsListProps {
	items: any[];
}

const TagsList: React.FC<TagsListProps> = ({ items }) => {
	const { Tags } = useTags();
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	useEffect(() => {
		let na = [];
		if (items && Tags) {
			Tags.map((item) => {
				items.map((id) => {
					if (item.id == id) na.push(item.name);
				});
			});
		}

		setSelectedItems(na);
	}, [items, Tags]);

	return (
		<>
			{selectedItems.map((item) => (
				<Tag key={item}>#{item}</Tag>
			))}
		</>
	);
};

export default TagsList;
