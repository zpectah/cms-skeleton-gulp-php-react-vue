import React, { useState } from 'react';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import styled from 'styled-components';

// https://blog.logrocket.com/building-rich-text-editors-in-react-using-draft-js-and-react-draft-wysiwyg/

import toolbar from './toolbar';

const Wrapper = styled.div<{ forPage: boolean }>`
	width: 100%;
	height: ${(props) => (props.forPage ? '500px' : '300px')};
	position: relative;
	border: 1px solid rgba(25, 25, 25, 0.125);
`;

export interface WysiwygProps {
	value: string | any;
	onChange: Function;
	placeholder?: string;
	forPage?: boolean;
}

const WysiwygBase: React.FC<WysiwygProps> = ({
	value,
	onChange,
	placeholder,
	forPage,
}) => {
	const [editorState, setEditorState] = useState(() =>
		value
			? EditorState.createWithContent(
					ContentState.createFromBlockArray(convertFromHTML(value)),
			  )
			: EditorState.createEmpty(),
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
		<Wrapper forPage={forPage}>
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
