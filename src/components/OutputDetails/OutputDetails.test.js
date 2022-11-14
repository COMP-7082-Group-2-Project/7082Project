import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import OutputDetails from "./index";

// Check if Output Details render
test("Renders the Output Details", () => {
    render(<OutputDetails />);

    // Select the Output Details
    const outputDetails = screen.getByTestId("output-details");

    // Check if Output Details are in the document
    expect(outputDetails).toBeInTheDocument();
})

// Check if Status, Memory, and Time render
test("Renders the Status, Memory, and Time", () => {
    render(<OutputDetails />);

    // Select the Status, Memory, and Time
    const status = screen.getByText("Status:");
    const memory = screen.getByText("Memory:");
    const time = screen.getByText("Time:");

    // Check if Status, Memory, and Time are in the document
    expect(status).toBeInTheDocument();
    expect(memory).toBeInTheDocument();
    expect(time).toBeInTheDocument();
})