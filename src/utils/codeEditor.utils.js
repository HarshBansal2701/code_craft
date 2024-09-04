export function handleEditorDidMount(editor, monaco) {
    editor.updateOptions({
       lineNumbers: "on",
      fontSize: "16px",
      mouseWheelZoom: true,
    });
  };
  