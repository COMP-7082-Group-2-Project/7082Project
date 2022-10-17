import React, { useEffect, useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { CodeContainer } from "./CodeEditorStyles";
import { ChallengeLanguages } from "../../data/ChallengeLanguages";

const CodeEditor = ({ onChange, language, code, theme }) => {
    // States, references
    const [value, setValue] = useState(code || "");
    const editorRef = useRef(null);

    // Constants
    const PROBLEM_STATEMENT_LENGTH = 12;

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
                    editorRef.current = editor;

                    // Set custom tooltip message
                    const messageContribution = editor.getContribution("editor.contrib.messageController");
                    
                    editor.onDidAttemptReadOnlyEdit(() => {
                        messageContribution.showMessage("You can't edit this area!", editor.getPosition());
                    })

                    // Don't allow read-write access if user is in an non-editable area
                    editor.onDidChangeCursorSelection(e => {
                        // Get the cursor position
                        const cursorPosition = editorRef.current.getPosition();
                        const { lineNumber } = cursorPosition;

                        // Get the language for read-only lines (test cases)
                        const currentLanguage = ChallengeLanguages.find(l => l.name === editor.getModel()._languageId);
                        const testCasesLine = currentLanguage.readOnly || 3;

                        if (lineNumber <= PROBLEM_STATEMENT_LENGTH || lineNumber > editor.getModel().getLineCount() - testCasesLine) {
                            editorRef.current.updateOptions({ readOnly: true });
                        } else {
                            editorRef.current.updateOptions({ readOnly: false });
                        }
                    })
                }}
            />
        </CodeContainer>
    )
}

export default CodeEditor