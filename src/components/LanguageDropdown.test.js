import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { select } from "react-select-event";
import Landing from "./Landing";

test("Change language", () => {
    render(<Landing />);

    const languageDropdownWrapper = screen.getByTestId("language-dropdown-wrapper");

    // Check if language dropdown is rendered
    expect(screen.getByText("JavaScript (Node.js 12.14.0)")).toBeInTheDocument();

    // Change language to C
    select(languageDropdownWrapper.firstChild, { id: 75, name: "C (Clang 7.0.1)", label: "C (Clang 7.0.1)", value: "c", }); // eslint-disable-line

    // Check if language dropdown is changed
    expect(screen.getByText("C (Clang 7.0.1)")).toBeInTheDocument();
})
