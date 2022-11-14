import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import OutputWindow from "./index";

// Check if Output Window renders
test("Renders the Output Window", () => {
    render(<OutputWindow />);

    // Select the Output Details
    const outputWindow = screen.getByTestId("output-window");

    // Check if Output Window is in the document
    expect(outputWindow).toBeInTheDocument();
})