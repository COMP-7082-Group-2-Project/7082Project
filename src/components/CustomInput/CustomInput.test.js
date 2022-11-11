import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import CustomInput from "./index";

// Check if CustomInput renders
test("Renders the CustomInput component", () => {
    render(<CustomInput />);

    // Select the accordion
    const customInput = screen.getByTestId("custom-input");

    // Check if accordion is in the document
    expect(customInput).toBeInTheDocument();
})