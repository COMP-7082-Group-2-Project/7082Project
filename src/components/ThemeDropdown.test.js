import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { select } from "react-select-event";
import Landing from "./Landing";

test("Change theme", () => {
    render(<Landing />);

    const themeDropdownWrapper = screen.getByTestId("theme-dropdown-wrapper");

    // Check if theme dropdown is rendered
    expect(screen.getByText("Select Theme")).toBeInTheDocument();

    // Change theme to "Dracula"
    select(themeDropdownWrapper.firstChild, { value: "dracula", label: "Dracula" }); // eslint-disable-line

    // Check if theme dropdown is changed
    expect(screen.getByText("Dracula")).toBeInTheDocument();
})
