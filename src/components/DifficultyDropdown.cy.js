import DifficultyDropdown from "./DifficultyDropdown";
import Landing from "./Landing";

describe("<DifficultyDropdown />", () => {
    it("mounts", () => {
        cy.mount(
            <DifficultyDropdown />
        );
    })

    it("Changes difficulty", () => {
        cy.mount(
            <Landing />
        );

        cy.get("#difficulty-select").type("{enter}");

        // Check if difficulty is set to Easy
        cy.findByText("Easy").should("exist");
    })
})