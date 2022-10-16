import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { CodeContainer } from "./CodeEditorStyles";

const CodeEditor = ({ onChange, language, code, theme, readOnly }) => {
    // States, references
    const [value, setValue] = useState(code || "");
    const READ_ONLY = 12;

    const handleEditorChange = (value) => {
        setValue(value);
        onChange("code", value);
    };

    // Change code editor value when difficulty changes
    useEffect(() => {
        setValue(code);
        onChange("code", code);
    }, [code, onChange]);

    return (
        <CodeContainer>
            <Editor
                height="85vh"
                width={`100%`}
                language={language || "javascript"}
                value={value}
                theme={theme}
                defaultValue="// some comment"
                onChange={handleEditorChange}
                options={{ wordWrap: "on" }}
                onMount={(editor) => {
                    editor.onDidChangeCursorPosition(e => {
                        // Make problem statement uneditable
                        if (e.position.lineNumber < READ_ONLY) {
                            editor.setPosition({ lineNumber: READ_ONLY, column: 1 });
                        }

                        // Make last 3 lines uneditable
                        if (e.position.lineNumber > editor.getModel().getLineCount() - 3) {
                            editor.setPosition({ lineNumber: editor.getModel().getLineCount() - 3, column: 1 });
                        }
                    })
                }}
            />
        </CodeContainer>
    )
}

export default CodeEditor