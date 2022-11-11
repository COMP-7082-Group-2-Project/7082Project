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

// test("Toggle accordion displays correct image and text", () => {
//     render(
//         <Accordion id={1} explanations={
//             {
//                 "javascript": [
//                     "The addition operator (+) adds two numbers together",
//                     "ES6 Arrow Syntax is used to define the function",
//                     "The return keyword can be omitted for single line arrow functions"
//                 ],
//                 "python": [
//                     "The addition operator (+) adds two numbers together",
//                     "The return keyword is used to return the result of the function"
//                 ]
//             }
//         } />
//     );

//     // Select the accordion
//     const accordion = screen.getByTestId("accordion");

//     // Select the second child (first toggle)
//     const toggle = accordion.childNodes[1];

//     // Click the toggle
//     act(() => {
//         toggle.click();
//     })

//     // Select the code image from the expanded toggle
//     const codeImage = screen.getByTestId("code-image");

//     // Check if the image and explanation is correct based on the alt text and text content
//     expect(codeImage.alt).toBe("JavaScript Challenge Solution");

//     // Check if the explanation list has the correct text
//     expect(screen.getByText("The addition operator (+) adds two numbers together")).toBeInTheDocument();
// })