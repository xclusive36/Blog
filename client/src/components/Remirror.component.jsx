import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import {
  ThemeProvider,
  useRemirrorContext,
} from "@remirror/react";
import { MarkdownEditor } from "@remirror/react-editors/markdown";
import PropTypes from "prop-types";

const ImperativeHandle = forwardRef((_, ref) => {
  const { setContent } = useRemirrorContext({
    autoUpdate: true,
  });

  // Expose content handling to outside
  useImperativeHandle(ref, () => ({ setContent }));

  return <></>;
});

ImperativeHandle.displayName = "ImperativeHandle";

const MDEditor = ({
  placeholder = "Start typing...",
  content,
  handleChange,
}) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(content);
      // setIsBlogSetToBeUpdated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return (
    <>
      <button
        onMouseDown={(event) => event.preventDefault()}
        onClick={(e) => {
          if (editorRef.current) {
            e.preventDefault();
            editorRef.current.setContent(content);
          }
        }}>
        Replace content
      </button>
      <ThemeProvider>
        <MarkdownEditor
          placeholder={placeholder}
          initialContent={content}
          onChange={handleChange}>
          <ImperativeHandle ref={editorRef} />
        </MarkdownEditor>
      </ThemeProvider>
    </>
  );
};

MDEditor.propTypes = {
  placeholder: PropTypes.string,
  content: PropTypes.string,
  handleChange: PropTypes.func,
};

export default MDEditor;
