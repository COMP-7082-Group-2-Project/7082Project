import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Accordion from "./index";
import { act } from "react-test-renderer";

// Check if accordion renders
test("Renders the accordion", () => {
    render(<Accordion />);

    // Select the accordion
    const accordion = screen.getByTestId("accordion");

    // Check if accordion is in the document
    expect(accordion).toBeInTheDocument();
})

test("Check if JavaScript and Python headings are rendered", () => {
    render(<Accordion />);

    const MIN_CHILD_COUNT = 1;

    // Select the accordion
    const accordion = screen.getByTestId("accordion");

    // Check if accordion has at least one heading
    expect(accordion.childNodes.length).toBeGreaterThan(MIN_CHILD_COUNT);
})

test("Toggle accordion displays correct image and text", () => {
    render(
        <Accordion id={1} explanations={
            {
                "javascript": [
                    "The addition operator (+) adds two numbers together",
                    "ES6 Arrow Syntax is used to define the function",
                    "The return keyword can be omitted for single line arrow functions"
                ],
                "python": [
                    "The addition operator (+) adds two numbers together",
                    "The return keyword is used to return the result of the function"
                ]
            }
        } />
    );

    // Select the accordion
    const accordion = screen.getByTestId("accordion");

    // Select the second child (first toggle)
    const toggle = accordion.childNodes[1];

    // Click the toggle
    act(() => {
        toggle.click();
    })

    // Select the code image from the expanded toggle
    const codeImage = screen.getByTestId("code-image");

    // Check if the image and explanation is correct based on the alt text and text content
    expect(codeImage.alt).toBe("JavaScript Challenge Solution");

    // Check if the explanation list has the correct text
    expect(screen.getByText("The addition operator (+) adds two numbers together")).toBeInTheDocument();
})