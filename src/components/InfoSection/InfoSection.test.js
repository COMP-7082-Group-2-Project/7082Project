import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import InfoSection from "./index";

// Check if Info Section renders
test("Renders the Info Section", () => {
    render(<InfoSection />);

    // Select the accordion
    const infoSection = screen.getByTestId("info-section");

    // Check if Info Section is in the document
    expect(infoSection).toBeInTheDocument();
})

// Check if Submit Image renders
test("Renders the Submit Image", () => {
    render(<InfoSection />);

    // Select the Submit Image
    const submitImage = screen.getByAltText("Submit");

    // Check if Submit Image is in the document
    expect(submitImage).toBeInTheDocument();
})