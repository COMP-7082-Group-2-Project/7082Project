import { render, screen, waitFor } from '@testing-library/react';
import { select } from "react-select-event";
import '@testing-library/jest-dom'
import Landing from "./index";
import { act } from "react-test-renderer";

// Check if Landing page renders
test("Renders the Landing page", () => {
    render(<Landing />);

    // Select the Landing page
    const landing = screen.getByTestId("landing-container");

    // Check if accordion is in the document
    expect(landing).toBeInTheDocument();
})

// Check if default theme is loaded
test("Default theme is loaded", async () => {
    render(<Landing />);

    const themeDropdownWrapper = screen.getByTestId("theme-dropdown-wrapper");

    select(themeDropdownWrapper.firstChild, // eslint-disable-line
        {
            value: "oceanic-next",
            label: "Oceanic Next"
        }
    );

    // Check if default theme is loaded
    expect(screen.getByText("Oceanic Next")).toBeInTheDocument();
})