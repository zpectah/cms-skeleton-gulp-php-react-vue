import React, { useState } from 'react';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import styled from 'styled-components';

// https://blog.logrocket.com/building-rich-text-editors-in-react-using-draft-js-and-react-draft-wysiwyg/

import toolbar from './toolbar';

const Wrapper = styled.div`
	width: 100%;
	height: 300px;
	position: relative;
	border: 1px solid rgba(25, 25, 25, 0.125);
`;

export interface WysiwygProps {
	value: string | any;
	onChange: Function;
	placeholder?: string;
}

const WysiwygBase: React.FC<WysiwygProps> = ({
	value,
	onChange,
	placeholder,
}) => {
	const [editorState, setEditorState] = useState(() =>
		// EditorState.createEmpty(),
		EditorState.createWithContent(
			ContentState.createFromBlockArray(convertFromHTML(value)),
		),
	);

	const handleEditorChange = (state) => {
		setEditorState(state);
		convertContentToHTML();
	};
	const convertContentToHTML = () => {
		let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
		onChange(currentContentAsHTML);
	};

	return (
		<Wrapper>
			<Editor
				defaultEditorState={editorState}
				onEditorStateChange={handleEditorChange}
				toolbar={toolbar}
				// wrapperStyle={<wrapperStyleObject>}
				// editorStyle={<editorStyleObject>}
				// toolbarStyle={<toolbarStyleObject>}
			/>
		</Wrapper>
	);
};

export default WysiwygBase;
