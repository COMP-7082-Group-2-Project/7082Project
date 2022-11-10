import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { select } from "react-select-event";
import Landing from "./Landing";

test("Change language", () => {
    render(<Landing />);

    const difficultyDropdownWrapper = screen.getByTestId("difficulty-dropdown-wrapper");

    // Check if difficulty dropdown is rendered
    expect(screen.getByText("Select Difficulty")).toBeInTheDocument();

    // Change difficulty to "Hard"
    select(difficultyDropdownWrapper.firstChild, { id: 3, name: "Hard", label: "Hard", value: "hard" }); // eslint-disable-line

    // Check if difficulty dropdown is changed
    expect(screen.getByText("Hard")).toBeInTheDocument();
})
