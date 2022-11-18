import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { CodeContainer } from "./CodeEditorStyles";
import { languageSeparators, initialCode } from "../../lib/initialCode";

const CodeEditor = ({ onChange, language, code, theme, mode }) => {
    // States, references
    const [value, setValue] = useState(code || "");
    const editorRef = useRef(null);

    // Constants
    const PROBLEM_STATEMENT_LENGTH = 18;

    const handleEditorChange = (value) => {
        setValue(value);
        onChange("code", value);

        if (mode === "free") return;

        editorRef.current.onDidChangeModelContent((e) => {
            if (e.isUndoing || editorRef.current.ignoreChange) {
                return;
            }

            e.changes.forEach(change => {
                // If the user is typing in the problem statement, undo the change
                if (change.range.startLineNumber < PROBLEM_STATEMENT_LENGTH) {
                    editorRef.current.ignoreChange = true;
                    editorRef.current.getModel().undo();
                    editorRef.current.ignoreChange = false;
                }
            })
        })
    };

    const setDefaultValue = () => {
        if (!languageSeparators[language]) return initialCode;

        return languageSeparators[language][0] + initialCode + languageSeparators[language][1];
    }

    return (
        <CodeContainer>
            {mode === "free" ? (
                <Editor
                    height="75vh"
                    width={`100%`}
                    language={language || "javascript"}
                    value={value}
                    theme={theme}
                    defaultValue={setDefaultValue()}
                    onChange={handleEditorChange}
                    options={{
                        wordWrap: "on",
                        fontFamily: "Source Code Pro",
                        fontSize: 16
                    }}
                    beforeMount={(monaco) => {
                        // Destroys old editor instance for free mode
                        monaco.editor.getModels().forEach(model => model.dispose());
                    }}
                    onMount={(editor) => {
                        editorRef.current = editor;

                        // Set the editor to javascript default code
                        editor.setValue(setDefaultValue());
                    }}
                />
            ) : (<Editor
                height="75vh"
                width={`100%`}
                language={language || "javascript"}
                value={value}
                theme={theme}
                defaultValue="// some comment"
                onChange={handleEditorChange}
                options={{
                    wordWrap: "on",
                    fontFamily: "Source Code Pro",
                    fontSize: 16
                }}
                beforeMount={(monaco) => {
                    // Destroys old editor instance for free mode
                    monaco.editor.getModels().forEach(model => model.dispose());
                }}
                onMount={(editor) => {
                    editorRef.current = editor;

                    // Set custom tooltip message
                    const messageContribution = editor.getContribution("editor.contrib.messageController");

                    editor.onDidAttemptReadOnlyEdit(() => {
                        messageContribution.showMessage("You can't edit the problem statement!", editor.getPosition());
                    })

                    // Don't allow read-write access if user is in an non-editable area
                    editor.onDidChangeCursorSelection(() => {
                        // Get the cursor position
                        const cursorPosition = editorRef.current.getPosition();
                        const { lineNumber } = cursorPosition;

                        if (lineNumber < PROBLEM_STATEMENT_LENGTH) {
                            editorRef.current.updateOptions({ readOnly: true });
                        } else {
                            editorRef.current.updateOptions({ readOnly: false });
                        }
                    })
                }}
            />)}
        </CodeContainer>
    )
}

export default CodeEditor