import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import CodeEditor from "./index";
import { act } from "react-test-renderer";

const javascriptDefault = `/*
Welcome to EdiCode! 

This is a code editor that allows you to write, compile, and execute code right in your browser.
Start coding by typing in the editor below. You can change the language or theme in the dropdown menus above.
You can also start a coding challenge by choosing a difficulty level in the dropdown menu above.

Happy coding!
*/
`;

jest.mock("@monaco-editor/react", () => ({ onChange, language, code, mode }) => {
    return (
        <textarea
            data-testid="mock-editor"
            language={language || "javascript"}
            onChange={(value) => onChange("code", value)}
            value={code || javascriptDefault}
        ></textarea>
    );
});

// Check if Code Editor renders on page load
test("Renders the Code Editor", () => {
    render(<CodeEditor />);

    // Select the Code Editor
    const codeEditor = screen.getByTestId("code-editor");

    // Check if Code Editor is in the document
    expect(codeEditor).toBeInTheDocument();
})

test("Check if Code Editor has Welcome Message", async () => {
    render(<CodeEditor mode="free" />);

    // Select the Code Editor
    const codeEditor = screen.getByTestId("mock-editor");

    // Check if Code Editor has Welcome Message
    expect(codeEditor).toHaveValue(javascriptDefault);
})

test("Check if Code Editor loads default language", () => {
    render(<CodeEditor mode="free" />);

    // Select the Code Editor
    const codeEditor = screen.getByTestId("mock-editor");

    // Check if Code Editor has Welcome Message
    expect(codeEditor).toHaveAttribute("language", "javascript");
})

test("Changes Code Editor content when typing", () => {
    render(<CodeEditor mode="free" />);

    // Select the Code Editor
    const codeEditor = screen.getByTestId("mock-editor");

    // Check if Code Editor has Welcome Message
    expect(codeEditor).toHaveValue(javascriptDefault);

    // Simulate typing in the Code Editor
    act(() => {
        codeEditor.value += "console.log('Hello World!')";
    });

    // Check if Code Editor has new content
    expect(codeEditor).toHaveValue(javascriptDefault + "console.log('Hello World!')");
})