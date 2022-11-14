import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Landing from "./index";

// Check if Landing page renders
test("Renders the Landing page", () => {
    render(<Landing />);

    // Select the Landing page
    const landing = screen.getByTestId("landing-container");

    // Check if Landing page is in the document
    expect(landing).toBeInTheDocument();
})

// Check if default theme is loaded
test("Default theme is loaded", () => {
    render(<Landing />);

    setTimeout(() => {
        expect(screen.getByText("Oceanic Next")).toBeInTheDocument();
    }, 1000);
})

// Check if Submit button renders
test("Renders the Submit button", () => {
    render(<Landing />);

    // Select the Submit button
    const submitButton = screen.getAllByAltText("Submit")[0];

    // Check if Submit button is in the document
    expect(submitButton).toBeInTheDocument();
})

// Check if Copy To Clipboard button renders
test("Renders the Copy To Clipboard button", () => {
    render(<Landing />);

    // Select the Copy To Clipboard button
    const copyButton = screen.getByTestId("clipboard-btn");

    // Check if Copy To Clipboard button is in the document
    expect(copyButton).toBeInTheDocument();
})

// Check if Solution Modal renders
test("Renders the Solution Button", () => {
    render(<Landing />);

    // Select the Solution Button (lightbulb) and Solution Modal
    const solutionButton = screen.getByTestId("solution-btn");

    // Check if Solution Modal is in the document
    expect(solutionButton).toBeInTheDocument();
})