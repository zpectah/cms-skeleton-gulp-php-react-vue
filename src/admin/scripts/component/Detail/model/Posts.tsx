import React from 'react';

interface PostsDetailProps {
	detailData: any;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
}

const PostsDetail: React.FC<PostsDetailProps> = (props) => {
	const { detailData, onCancel, onSave, onDelete } = props;

	return <>PostsDetail ... {JSON.stringify(detailData)}</>;
};

export default PostsDetail;
